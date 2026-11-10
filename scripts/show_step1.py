import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261106_05_access_control_and_invites.sql", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(15, 45):
    print(f"{j+1}: {lines[j]}", end="")

