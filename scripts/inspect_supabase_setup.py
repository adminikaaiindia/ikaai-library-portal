import sys
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['supabase-config.js', 'supabase-client.js']:
    print(f'=== {fname} ===')
    with open(fname, encoding='utf-8') as f:
        print(f.read())

