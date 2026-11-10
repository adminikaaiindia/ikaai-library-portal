with open('supabase/seed.sql', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('programmes')
print(txt[idx-50:idx+600])

