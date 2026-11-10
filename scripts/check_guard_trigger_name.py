with open('supabase/migrations/20261106_01_schema_reconciliation.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('guard_profile_updates')
while idx != -1:
    print('Match at', idx, ':')
    print(sql[max(0, idx-50):min(len(sql), idx+200)])
    print('---')
    idx = sql.find('guard_profile_updates', idx+1)

