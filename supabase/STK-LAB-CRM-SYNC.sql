-- Run once in Supabase SQL Editor.
create table if not exists public.stk_lab_crm_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.stk_lab_crm_state enable row level security;
revoke all on public.stk_lab_crm_state from anon, authenticated;
create index if not exists stk_lab_crm_state_updated_at_idx on public.stk_lab_crm_state (updated_at desc);
