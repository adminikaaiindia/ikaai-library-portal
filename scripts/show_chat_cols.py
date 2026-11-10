import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261106_03_team_chat_and_documents.sql", encoding="utf-8") as f:
    text = f.read()

idx = text.find("create table if not exists public.chat_conversations")
print(text[idx:idx+600])

