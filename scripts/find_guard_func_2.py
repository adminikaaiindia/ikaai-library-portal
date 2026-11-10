import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('supabase/migrations/20261106_01_schema_reconciliation.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('function public.guard_profile_updates()')
print(sql[idx+800:idx+2200])

