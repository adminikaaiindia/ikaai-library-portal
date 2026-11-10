with open('supabase/migrations/20261104_01_core_schema.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('insert into public.programmes')
if idx != -1:
    print(sql[idx:idx+800])
else:
    print("programmes seed not in 20261104_01")

