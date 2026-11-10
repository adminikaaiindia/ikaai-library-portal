import sys
sys.stdout.reconfigure(encoding='utf-8')

for fn in ['supabase/migrations/20261104_02_rls_policies.sql', 'supabase/migrations/20261106_01_schema_reconciliation.sql']:
    with open(fn, encoding='utf-8') as f:
        txt = f.read()
    idx = txt.find('profiles')
    while idx != -1:
        if 'policy' in txt[max(0, idx-100):idx+100]:
            print(f"In {fn}:")
            print(txt[max(0, idx-50):min(len(txt), idx+300)])
            print('---')
        idx = txt.find('profiles', idx+1)

