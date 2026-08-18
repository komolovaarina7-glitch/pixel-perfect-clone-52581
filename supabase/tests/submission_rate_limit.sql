begin;

do $$
declare
  test_fingerprint text := repeat('a', 64);
  attempt integer;
  stored_count integer;
begin
  for attempt in 1..5 loop
    perform public.accept_asset_submission(
      test_fingerprint,
      'Heritage hotel',
      'Riga, Latvia',
      'Operational',
      'Single owner',
      'A valid strategic challenge for integration testing.',
      'Test Owner',
      'owner@example.com',
      'Example Holdings',
      'Email',
      'en'
    );
  end loop;

  begin
    perform public.accept_asset_submission(
      test_fingerprint,
      'Heritage hotel',
      'Riga, Latvia',
      'Operational',
      'Single owner',
      'The sixth request must be rejected by the database.',
      'Test Owner',
      'owner@example.com',
      'Example Holdings',
      'Email',
      'en'
    );
    raise exception 'Expected the sixth submission to be rate limited';
  exception
    when raise_exception then
      if sqlerrm <> 'submission_rate_limited' then
        raise;
      end if;
  end;

  select count(*) into stored_count
  from private.asset_submissions
  where request_fingerprint = test_fingerprint;

  if stored_count <> 5 then
    raise exception 'Expected 5 stored submissions, found %', stored_count;
  end if;

  if has_function_privilege(
    'anon',
    'public.accept_asset_submission(text,text,text,text,text,text,text,text,text,text,text)',
    'EXECUTE'
  ) then
    raise exception 'anon must not be allowed to execute accept_asset_submission';
  end if;
end;
$$;

rollback;git config --global user.name "Arina Komolova"git config --global user.name "Arina Komolova"git config --global user.name "Arina Komolova"git config --global user.name "Arina Komolova"git config --global user.name "Arina Komolova"