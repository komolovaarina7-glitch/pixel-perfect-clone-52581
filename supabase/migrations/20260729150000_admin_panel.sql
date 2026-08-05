create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  group_name text not null check (char_length(group_name) between 2 and 80),
  content_key text not null check (char_length(content_key) between 2 and 120),
  label text not null check (char_length(label) between 2 and 160),
  value_en text not null default '',
  value_ru text not null default '',
  published boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (group_name, content_key)
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title_en text not null default '',
  title_ru text not null default '',
  theme_en text not null default '',
  theme_ru text not null default '',
  challenge_en text not null default '',
  challenge_ru text not null default '',
  logic_en text not null default '',
  logic_ru text not null default '',
  direction_en text not null default '',
  direction_ru text not null default '',
  image_url text not null default '',
  published boolean not null default false,
  sort_order integer not null default 100,
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 180),
  storage_path text not null unique,
  public_url text not null,
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp')),
  size_bytes integer not null check (size_bytes > 0 and size_bytes <= 10485760),
  alt_en text not null default '',
  alt_ru text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  setting_key text primary key,
  value text not null default '',
  label text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.case_studies enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Published site content is public" on public.site_content;
create policy "Published site content is public"
  on public.site_content for select
  to anon, authenticated
  using (published);

drop policy if exists "Published case studies are public" on public.case_studies;
create policy "Published case studies are public"
  on public.case_studies for select
  to anon, authenticated
  using (published);

drop policy if exists "Media metadata is public" on public.media_assets;
create policy "Media metadata is public"
  on public.media_assets for select
  to anon, authenticated
  using (true);

drop policy if exists "Site settings are public" on public.site_settings;
create policy "Site settings are public"
  on public.site_settings for select
  to anon, authenticated
  using (true);

grant select on public.site_content, public.case_studies, public.media_assets, public.site_settings
  to anon, authenticated;
grant all on public.site_content, public.case_studies, public.media_assets, public.site_settings
  to service_role;

insert into public.site_content (group_name, content_key, label, value_en, value_ru)
values
  (
    'home',
    'hero_eyebrow',
    'Главная — строка над заголовком',
    'REPOSITION LAB — RANTA LIMITED, London',
    'REPOSITION LAB — RANTA LIMITED, LONDON'
  ),
  (
    'home',
    'hero_title',
    'Главная — основной заголовок',
    'Transforming distressed & underutilized real estate into investable opportunities',
    'Повышаем ценность и ликвидность сложных объектов недвижимости через стратегическое перепозиционирование'
  ),
  (
    'home',
    'hero_intro',
    'Главная — текст под заголовком',
    'A strategic recovery and real estate intelligence partner for banks, asset holders, special situations investors and institutional owners.',
    'REPOSITION LAB работает с банками, владельцами объектов, инвесторами и институциональными собственниками, которым нужно переосмыслить сложный объект и подготовить его к более сильному рыночному сценарию.'
  )
on conflict (group_name, content_key) do nothing;

insert into public.site_settings (setting_key, value, label)
values
  ('contact_email', 'office@repositionlab.com', 'Основной email'),
  ('company_name', 'REPOSITION LAB', 'Название компании'),
  ('office_location', 'London · RANTA LIMITED', 'Основная локация')
on conflict (setting_key) do nothing;

create or replace function public.admin_list_asset_submissions()
returns table (
  id uuid,
  created_at timestamptz,
  status text,
  asset_type text,
  location text,
  condition text,
  ownership text,
  challenge text,
  contact_name text,
  contact_email text,
  organization text,
  contact_method text,
  locale text
)
language sql
security definer
set search_path = pg_catalog, public, private
as $$
  select
    s.id,
    s.created_at,
    s.status,
    s.asset_type,
    s.location,
    s.condition,
    s.ownership,
    s.challenge,
    s.contact_name,
    s.contact_email,
    s.organization,
    s.contact_method,
    s.locale
  from private.asset_submissions s
  order by s.created_at desc
  limit 500;
$$;

create or replace function public.admin_update_asset_submission_status(
  p_id uuid,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public, private
as $$
begin
  if p_status not in ('new', 'reviewing', 'closed', 'rejected') then
    raise exception using errcode = '22023', message = 'invalid_status';
  end if;

  update private.asset_submissions
  set status = p_status
  where id = p_id;
end;
$$;

create or replace function public.admin_delete_asset_submission(p_id uuid)
returns void
language sql
security definer
set search_path = pg_catalog, public, private
as $$
  delete from private.asset_submissions where id = p_id;
$$;

revoke all on function public.admin_list_asset_submissions() from public, anon, authenticated;
revoke all on function public.admin_update_asset_submission_status(uuid, text)
  from public, anon, authenticated;
revoke all on function public.admin_delete_asset_submission(uuid)
  from public, anon, authenticated;
grant execute on function public.admin_list_asset_submissions() to service_role;
grant execute on function public.admin_update_asset_submission_status(uuid, text) to service_role;
grant execute on function public.admin_delete_asset_submission(uuid) to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Site media is publicly readable" on storage.objects;
create policy "Site media is publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'site-media');

comment on table public.site_content is
  'Bilingual editable copy used by the public site.';
comment on table public.media_assets is
  'Public image metadata. Upload and delete operations are performed only by authenticated admin server functions.';
