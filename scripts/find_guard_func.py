import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('supabase/migrations/20261106_01_schema_reconciliation.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('function public.guard_profile_updates')
if idx == -1:
    idx = sql.find('trigger')
while idx != -1:
    if 'function' in sql[idx:idx+100] and 'guard' in sql[idx:idx+100]:
        print(sql[idx:idx+1500])
        break
    idx = sql.find('guard', idx+1)

