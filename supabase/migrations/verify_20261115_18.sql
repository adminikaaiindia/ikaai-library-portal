-- ====================================================================
-- VERIFICATION SCRIPT FOR MIGRATION 20261115_18
-- ====================================================================

-- 1. Check get_dashboard_summary definition & privileges
select 
  r.routine_name,
  r.security_type,
  p.grantee,
  p.privilege_type
from information_schema.routines r
join information_schema.routine_privileges p 
  on r.specific_name = p.specific_name
where r.routine_schema = 'public' 
  and r.routine_name = 'get_dashboard_summary';

-- Expected: 
-- grantee = 'authenticated', privilege_type = 'EXECUTE'
-- No rows for 'anon' or 'public'.

-- 2. Test execution of get_dashboard_summary (runs under caller's context)
select public.get_dashboard_summary();

