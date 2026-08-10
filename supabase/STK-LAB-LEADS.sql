-- Run ONCE in Supabase SQL Editor. Separate from Bakery data.
create table if not exists public.stk_lab_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  company text,
  project_type text,
  message text,
  locale text not null default 'ru' check (locale in ('ru','en')),
  source_path text,
  status text not null default 'new' check (status in ('new','contacted','in_progress','won','lost')),
  admin_notes text
);
alter table public.stk_lab_leads enable row level security;
drop policy if exists "public can submit stk lab leads" on public.stk_lab_leads;
create policy "public can submit stk lab leads" on public.stk_lab_leads
for insert to anon
with check (char_length(name) between 1 and 100 and char_length(contact) between 1 and 180 and locale in ('ru','en') and status='new');
create index if not exists stk_lab_leads_created_at_idx on public.stk_lab_leads (created_at desc);
create index if not exists stk_lab_leads_status_idx on public.stk_lab_leads (status);
