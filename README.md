# Thozha Associates

Animated full-stack construction website for Thozha Associates using React, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Supabase.

## Features

- Blueprint-to-real-house hero animation driven by GSAP
- Scroll-pinned construction journey with stage-by-stage progress
- Dynamic image feeds from Pexels, Unsplash, and Pixabay APIs
- Masonry projects gallery with modal preview and before/after slider
- Supabase-backed leads, testimonials, projects, auth, and storage
- Admin dashboard for managing testimonials and projects
- Floating WhatsApp and click-to-call actions

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file:

```bash
cp .env.example .env
```

3. Fill in:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PEXELS_API_KEY`
- `VITE_UNSPLASH_ACCESS_KEY`
- `VITE_PIXABAY_API_KEY`

4. Run the app:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Supabase Setup

1. Create a new Supabase project.
2. Run the SQL in [supabase/schema.sql](/supabase/schema.sql).
3. Create your first auth user in the Supabase dashboard.
4. Promote that user to admin:

```sql
update public.profiles
set is_admin = true
where id = 'YOUR_AUTH_USER_UUID';
```

5. Confirm the `site-media` bucket exists.

## Deployment

### Frontend

Deploy the Vite app to Vercel, Netlify, or Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- Add the same `VITE_*` env vars to the hosting platform

### Backend

Supabase handles:

- PostgreSQL
- Authentication
- Storage
- Row-level security

## Notes

- If no image API keys are present, the UI falls back to styled placeholders so the app still runs locally.
- Supabase-backed content becomes live as soon as your project URL, anon key, schema, and policies are configured.
