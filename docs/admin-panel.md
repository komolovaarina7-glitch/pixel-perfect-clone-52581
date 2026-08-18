# Reposition Lab admin panel

The administration area is available at `/admin`. It manages bilingual homepage copy, case
studies, public image uploads, confidential asset submissions, administrators, and basic site
settings.

## Required setup

1. Create or connect a Supabase project.
2. Apply the migrations in `supabase/migrations` in chronological order.
3. Add these server-only environment variables to Vercel Preview and Production:

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
SUBMISSION_RATE_LIMIT_SECRET
ADMIN_SESSION_SECRET
ADMIN_EMAILS
```

`ADMIN_SESSION_SECRET` must be a unique random string of at least 32 characters.
`ADMIN_EMAILS` is a comma-separated allowlist used to bootstrap the first administrator.

4. In Supabase Authentication, create the first email/password user with an email included in
   `ADMIN_EMAILS`.
5. Deploy and open `/admin/login`.

After login, additional administrators can be invited from the Users section. Every admin
operation is authorized again inside its server function. Database service credentials and user
sessions are never exposed to browser code.

## Content behavior

- Managed homepage hero fields override the built-in copy when the database is available.
- Managed published cases override matching built-in cases by slug and can add new case cards.
- If Supabase is temporarily unavailable, the public site keeps using its built-in content.
- Uploaded images are publicly readable, while upload and delete operations require an
  authenticated admin session.
