-- Run ONLY in MILKY CAKE Supabase.
alter table public.stk_lab_leads enable row level security;

drop policy if exists "stk lab admin can read leads" on public.stk_lab_leads;
create policy "stk lab admin can read leads"
on public.stk_lab_leads for select to authenticated
using (auth.uid() = '56964541-7502-4f8e-99da-5e36aaf3529b'::uuid);

drop policy if exists "stk lab admin can update leads" on public.stk_lab_leads;
create policy "stk lab admin can update leads"
on public.stk_lab_leads for update to authenticated
using (auth.uid() = '56964541-7502-4f8e-99da-5e36aaf3529b'::uuid)
with check (auth.uid() = '56964541-7502-4f8e-99da-5e36aaf3529b'::uuid);
