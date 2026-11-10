import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('supabase-client.js', encoding='utf-8') as f:
    client_code = f.read()

print("=== SUPABASE-CLIENT.JS ===")
print(client_code)

