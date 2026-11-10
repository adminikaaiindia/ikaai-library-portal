import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('supabase/migrations/20261104_03_server_functions.sql', encoding='utf-8') as f:
    sql = f.read()

idx = sql.find('avatars')
while idx != -1:
    print('--- avatars at', idx, '---')
    print(sql[max(0, idx-100):min(len(sql), idx+300)])
    idx = sql.find('avatars', idx+1)

