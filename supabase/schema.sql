create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and is_admin = true
  );
$$;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (category in ('Residential', 'Commercial', 'Renovation')),
  location text not null default '',
  area_label text,
  year integer,
  status text not null default 'Planning',
  summary text not null,
  cover_image_url text not null,
  before_image_url text,
  after_image_url text,
  storage_paths jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  project_type text,
  message text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  image_url text,
  storage_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  name text not null default 'Thozha Associates',
  tagline text not null default 'Building Your Dreams in Pollachi',
  blurb text not null default 'Trusted civil engineers since 2014 for residential and commercial construction, structural design, and project handover across Pollachi and the Coimbatore belt.',
  phone text not null default '+919000000000',
  whatsapp text not null default '919000000000',
  email text not null default 'hello@thozhaassociates.com',
  location text not null default 'Pollachi, Tamil Nadu',
  logo_url text,
  hero_blueprint_url text,
  hero_final_url text,
  featured_before_after_title text not null default 'Before and after transformation',
  featured_before_image_url text,
  featured_after_image_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.site_settings
add column if not exists hero_blueprint_url text;

alter table public.site_settings
add column if not exists hero_final_url text;

alter table public.site_settings
add column if not exists featured_before_after_title text not null default 'Before and after transformation';

alter table public.site_settings
add column if not exists featured_before_image_url text;

alter table public.site_settings
add column if not exists featured_after_image_url text;

create table if not exists public.site_content (
  id integer primary key default 1 check (id = 1),
  about jsonb not null default '{}'::jsonb,
  hero_features jsonb not null default '[]'::jsonb,
  hero_stats jsonb not null default '[]'::jsonb,
  services jsonb not null default '[]'::jsonb,
  careers jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '[]'::jsonb,
  why_choose_us jsonb not null default '[]'::jsonb,
  process_steps jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.projects
add column if not exists area_label text;

alter table public.testimonials
add column if not exists project_type text;

alter table public.site_content
add column if not exists about jsonb not null default '{}'::jsonb;

alter table public.site_content
add column if not exists hero_features jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists hero_stats jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists services jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists careers jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists social_links jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists why_choose_us jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists process_steps jsonb not null default '[]'::jsonb;

alter table public.site_content
add column if not exists faq jsonb not null default '[]'::jsonb;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  project_type text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute procedure public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute procedure public.set_updated_at();

drop trigger if exists set_site_content_updated_at on public.site_content;
create trigger set_site_content_updated_at
before update on public.site_content
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.leads enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "Users can view their profile" on public.profiles;
create policy "Users can view their profile"
on public.profiles
for select
using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "Users can update their profile" on public.profiles;
create policy "Users can update their profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can create their profile" on public.profiles;
create policy "Users can create their profile"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects
for select
using (true);

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
on public.projects
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read testimonials" on public.testimonials;
create policy "Public can read testimonials"
on public.testimonials
for select
using (true);

drop policy if exists "Admins manage testimonials" on public.testimonials;
create policy "Admins manage testimonials"
on public.testimonials
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
using (true);

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings"
on public.site_settings
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
using (true);

drop policy if exists "Admins manage site content" on public.site_content;
create policy "Admins manage site content"
on public.site_content
for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "Anyone can submit leads" on public.leads;
create policy "Anyone can submit leads"
on public.leads
for insert
with check (true);

drop policy if exists "Admins can read leads" on public.leads;
create policy "Admins can read leads"
on public.leads
for select
using (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

insert into public.site_settings (id)
values (1)
on conflict (id) do nothing;

insert into public.site_content (
  id,
  about,
  hero_features,
  hero_stats,
  services,
  careers,
  social_links,
  why_choose_us,
  process_steps,
  faq
)
values (
  1,
  $json${"headline":"Trusted civil engineering and construction partners in Pollachi","story":"Thozha Associates is a trusted civil engineering and construction firm based in Pollachi. Built on the idea of being a dependable companion to every client, the team delivers end-to-end support from structural design and planning to execution and final handover.","brand_meaning":"\"Thozha\" means friend or trusted companion in Tamil, reflecting the firm’s commitment to transparent and supportive project relationships.","lead_engineer_name":"Er. Taran D V","lead_engineer_role":"Licensed Civil Engineer","lead_engineer_summary":"With over a decade of engineering experience, Er. Taran D V leads structural planning, construction decisions, and site supervision with a practical, quality-first approach.","mission":"Be a trusted friend to every client through quality construction, clear communication, and dependable delivery.","service_area":"Serving residential and commercial clients across Pollachi, Coimbatore, Udumalaipettai, Palladam, and Dharapuram.","values":["Transparency","Quality","Timely Delivery","Client Satisfaction"]}$json$::jsonb,
  $json$["Trusted civil engineering support from design to handover","Residential homes, commercial buildings, and renovation works","Plan approvals, structural drawings, and site supervision"]$json$::jsonb,
  $json$[{"label":"Established","valueText":"Since 2014"},{"label":"Core services","value":8,"suffix":"+"},{"label":"Primary market","valueText":"Residential + Commercial"},{"label":"Service belt","valueText":"Pollachi + Coimbatore"}]$json$::jsonb,
  $json$[{"title":"Residential House Construction","description":"From budget homes to premium residences, the team handles planning, execution, and finishing with practical engineering guidance."},{"title":"Commercial Building Construction","description":"Commercial spaces, offices, warehouses, and business facilities are built with strong structural planning and site discipline."},{"title":"Structural Design & Drawings","description":"Structural design inputs and drawing coordination help translate requirements into buildable, safe systems."},{"title":"Building Plan Approval Assistance","description":"Support is provided for approval-related preparation and submission workflows, including local authority processes."},{"title":"Project Management & Site Supervision","description":"Regular supervision, progress tracking, and on-site decision-making keep the project aligned with quality and timeline goals."},{"title":"Renovation & Remodelling","description":"Existing homes and commercial spaces can be upgraded, extended, or refreshed without losing practical functionality."},{"title":"Interior Civil Works","description":"Flooring, plastering, tiling, and other civil finishing works are executed with attention to build quality and detail."},{"title":"Soil Testing & Foundation Design","description":"Early-stage ground assessment and foundation planning help reduce risk and strengthen long-term performance."}]$json$::jsonb,
  $json$[{"title":"Site Engineer","type":"Full Time","location":"Tamil Nadu"},{"title":"Junior Structural Designer","type":"Full Time","location":"Tamil Nadu"},{"title":"Project Coordinator","type":"Full Time","location":"Tamil Nadu"}]$json$::jsonb,
  $json$[{"label":"LinkedIn","url":"https://www.linkedin.com"},{"label":"Instagram","url":"https://www.instagram.com"},{"label":"Facebook","url":"https://www.facebook.com"}]$json$::jsonb,
  $json$[{"title":"Licensed engineering leadership","description":"Projects are guided by a licensed civil engineer with more than a decade of practical construction experience."},{"title":"End-to-end delivery","description":"Clients get support from structural planning and approvals through site execution and final handover."},{"title":"Strong local knowledge","description":"The team understands the construction needs, expectations, and working conditions of the Pollachi-Coimbatore belt."},{"title":"Transparent supervision","description":"Progress tracking, site oversight, and client communication are treated as core parts of every job."},{"title":"Quality with timeline focus","description":"Work is planned to balance structural integrity, workmanship quality, and dependable delivery milestones."}]$json$::jsonb,
  $json$[{"title":"Consultation & Project Brief","description":"Every project starts with requirements, site understanding, budget clarity, and a practical civil-engineering roadmap.","percent":0},{"title":"Structural Design & Approvals","description":"Structural drawings, plan inputs, and approval support shape the technical direction before site execution begins.","percent":25},{"title":"Soil Testing & Foundation Planning","description":"Ground conditions, footing logic, and foundation decisions are aligned early to protect the build from the base up.","percent":50},{"title":"Construction & Site Supervision","description":"Daily site management, workmanship checks, and project coordination keep construction disciplined and transparent.","percent":75},{"title":"Finishing & Handover","description":"Finishing works, final quality reviews, and client handover complete the journey from concept to built reality.","percent":100}]$json$::jsonb,
  $json$[{"question":"Do you handle both residential and commercial projects?","answer":"Yes. Thozha Associates serves residential homeowners, aspiring homeowners, business owners, and commercial clients across the Pollachi region."},{"question":"Can you help with building plan approvals?","answer":"Yes. The team provides plan approval assistance as part of the wider construction support process."},{"question":"Do you provide structural drawings and site supervision?","answer":"Yes. Structural design support, drawing coordination, project management, and site supervision are part of the service offering."},{"question":"Do you take renovation and remodelling work?","answer":"Yes. Renovation, remodelling, extension works, and interior civil works are part of the core services list."},{"question":"How do I get a quote for my project?","answer":"You can use the quote form on the website, call directly, or contact the team on WhatsApp to share your project requirement and location."}]$json$::jsonb
)
on conflict (id) do nothing;

drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media"
on storage.objects
for select
using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
on storage.objects
for insert
with check (
  bucket_id = 'site-media'
  and public.is_admin(auth.uid())
);

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
on storage.objects
for update
using (
  bucket_id = 'site-media'
  and public.is_admin(auth.uid())
)
with check (
  bucket_id = 'site-media'
  and public.is_admin(auth.uid())
);

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
on storage.objects
for delete
using (
  bucket_id = 'site-media'
  and public.is_admin(auth.uid())
);
