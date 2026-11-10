with open('supabase/migrations/20261104_03_server_functions.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('avatars_public_select')
print(sql[idx-50:idx+800])

