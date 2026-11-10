import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('supabase/migrations/20261106_01_schema_reconciliation.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('guard_profiles_update')
if idx == -1:
    idx = sql.find('guard')
print('Guard index:', idx)
if idx != -1:
    print(sql[idx-50:idx+1200])

