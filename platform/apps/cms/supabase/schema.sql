-- LSM CMS — Supabase schema
-- Run this once in the Supabase SQL editor for the project.

-- One JSON document per CMS collection (operators, offers, home-page,
-- landing-pages, site-pages, site-settings). Mirrors the local .cms-data/*.json files.
create table if not exists cms_documents (
    key text primary key,
    data jsonb not null,
    updated_at timestamptz not null default now()
);

alter table cms_documents enable row level security;

-- The public SFB site reads content with the anon key.
drop policy if exists "public read cms_documents" on cms_documents;
create policy "public read cms_documents" on cms_documents
    for select using (true);

-- Logged-in CMS editors may write (the CMS server also uses the service_role
-- key, which bypasses RLS; this covers anon+auth clients too).
drop policy if exists "authenticated write cms_documents" on cms_documents;
create policy "authenticated write cms_documents" on cms_documents
    for all to authenticated using (true) with check (true);

-- Public storage bucket for uploaded images (logos, backgrounds).
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

drop policy if exists "public read uploads" on storage.objects;
create policy "public read uploads" on storage.objects
    for select using (bucket_id = 'uploads');

drop policy if exists "authenticated upload uploads" on storage.objects;
create policy "authenticated upload uploads" on storage.objects
    for insert to authenticated with check (bucket_id = 'uploads');
