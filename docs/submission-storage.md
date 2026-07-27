# Confidential submission storage

The first storage phase accepts text fields only. Files and email delivery are intentionally disabled.

## Database

Apply the SQL file in `supabase/migrations` to a dedicated Supabase project. The migration:

- stores submissions and rate-limit counters in the non-exposed `private` schema;
- denies `anon` and `authenticated` access;
- exposes one RPC to `service_role`;
- atomically allows at most five accepted submissions per fingerprint and hour.

After applying the migration, execute `supabase/tests/submission_rate_limit.sql`. The test runs inside
a rolled-back transaction and verifies that five submissions are stored, the sixth is rejected, and
the anonymous role cannot execute the storage function.

## Environment

Set these server-only values locally and in Vercel Preview/Production:

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
SUBMISSION_RATE_LIMIT_SECRET
```

Do not expose the secret key or rate-limit secret through a `VITE_` variable.

## Retention and access

The application has no read endpoint. Review records from the Supabase dashboard until a separately
authenticated administration workflow is designed. Establish a retention policy before collecting
real submissions.
