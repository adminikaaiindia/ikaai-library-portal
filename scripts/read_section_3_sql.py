with open('supabase/migrations/20261106_01_schema_reconciliation.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('-- 3. USER SIGNUP PROFILE TRIGGER')
print(sql[idx:idx+1500])

