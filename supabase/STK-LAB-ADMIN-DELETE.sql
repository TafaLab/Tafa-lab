-- STK LAB — FINAL ADMIN DELETE ACCESS
-- Run ONLY in the MILKY CAKE Supabase project.

drop policy if exists "stk lab admin can delete leads" on public.stk_lab_leads;

create policy "stk lab admin can delete leads"
on public.stk_lab_leads
for delete
to authenticated
using (
  auth.uid() = '56964541-7502-4f8e-99da-5e36aaf3529b'::uuid
);
