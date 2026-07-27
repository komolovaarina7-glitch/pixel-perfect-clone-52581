create schema if not exists private;

create table if not exists private.asset_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'closed', 'rejected')),
  asset_type text not null check (char_length(asset_type) between 2 and 160),
  location text not null check (char_length(location) between 2 and 160),
  condition text not null default '' check (char_length(condition) <= 300),
  ownership text not null default '' check (char_length(ownership) <= 300),
  challenge text not null check (char_length(challenge) between 10 and 5000),
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  contact_email text not null check (char_length(contact_email) <= 254),
  organization text not null default '' check (char_length(organization) <= 180),
  contact_method text not null check (char_length(contact_method) between 2 and 120),
  locale text not null default 'en' check (locale in ('en', 'ru')),
  request_fingerprint text not null check (char_length(request_fingerprint) = 64)
);

create index if not exists asset_submissions_created_at_idx
  on private.asset_submissions (created_at desc);

create index if not exists asset_submissions_status_idx
  on private.asset_submissions (status, created_at desc);

create table if not exists private.submission_rate_limits (
  fingerprint text not null check (char_length(fingerprint) = 64),
  window_started_at timestamptz not null,
  request_count integer not null default 1 check (request_count > 0),
  expires_at timestamptz not null,
  primary key (fingerprint, window_started_at)
);

alter table private.asset_submissions enable row level security;
alter table private.submission_rate_limits enable row level security;

revoke all on schema private from public, anon, authenticated;
revoke all on all tables in schema private from public, anon, authenticated;

create or replace function public.accept_asset_submission(
  p_fingerprint text,
  p_asset_type text,
  p_location text,
  p_condition text,
  p_ownership text,
  p_challenge text,
  p_contact_name text,
  p_contact_email text,
  p_organization text,
  p_contact_method text,
  p_locale text
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
declare
  current_window timestamptz := date_trunc('hour', clock_timestamp());
  current_count integer;
  submission_id uuid;
begin
  if p_fingerprint !~ '^[a-f0-9]{64}$' then
    raise exception using errcode = '22023', message = 'invalid_fingerprint';
  end if;

  delete from private.submission_rate_limits
  where expires_at < clock_timestamp();

  insert into private.submission_rate_limits (
    fingerprint,
    window_started_at,
    request_count,
    expires_at
  )
  values (
    p_fingerprint,
    current_window,
    1,
    current_window + interval '2 hours'
  )
  on conflict (fingerprint, window_started_at)
  do update set request_count = private.submission_rate_limits.request_count + 1
  returning request_count into current_count;

  if current_count > 5 then
    raise exception using errcode = 'P0001', message = 'submission_rate_limited';
  end if;

  insert into private.asset_submissions (
    asset_type,
    location,
    condition,
    ownership,
    challenge,
    contact_name,
    contact_email,
    organization,
    contact_method,
    locale,
    request_fingerprint
  )
  values (
    p_asset_type,
    p_location,
    p_condition,
    p_ownership,
    p_challenge,
    p_contact_name,
    lower(p_contact_email),
    p_organization,
    p_contact_method,
    p_locale,
    p_fingerprint
  )
  returning id into submission_id;

  return submission_id;
end;
$$;

revoke all on function public.accept_asset_submission(
  text, text, text, text, text, text, text, text, text, text, text
) from public, anon, authenticated;

grant usage on schema public to service_role;
grant execute on function public.accept_asset_submission(
  text, text, text, text, text, text, text, text, text, text, text
) to service_role;

comment on table private.asset_submissions is
  'Confidential text-only asset review requests. Never expose through the client Data API.';

comment on function public.accept_asset_submission is
  'Atomically rate-limits and stores a validated text-only asset submission.';
