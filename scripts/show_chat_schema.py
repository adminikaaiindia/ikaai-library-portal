import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261103_team_chat_schema.sql", encoding="utf-8") as f:
    text = f.read()

idx = text.find("CREATE TABLE IF NOT EXISTS public.chat_conversations")
print(text[idx:idx+600])

