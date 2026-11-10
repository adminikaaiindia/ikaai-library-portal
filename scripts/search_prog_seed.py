import os

for f in sorted(os.listdir('supabase/migrations')):
    if f.endswith('.sql'):
        with open(os.path.join('supabase/migrations', f), encoding='utf-8') as sql_file:
            content = sql_file.read()
            if 'insert into public.programmes' in content or 'into public.programmes' in content:
                print(f"Found in {f}")

