import os

migrations_dir = 'supabase/migrations'
found = False
for f in sorted(os.listdir(migrations_dir)):
    if f.endswith('.sql'):
        path = os.path.join(migrations_dir, f)
        with open(path, encoding='utf-8') as sql_file:
            txt = sql_file.read()
            if 'avatars' in txt:
                print(f"Found 'avatars' in {f}")
                found = True
if not found:
    print("NO 'avatars' found in any migration in supabase/migrations!")

