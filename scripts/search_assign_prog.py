with open('data.js', encoding='utf-8') as f:
    txt = f.read()

idx = txt.find('assignInitialProgramme')
print('assignInitialProgramme in data.js:', idx)
if idx != -1:
    print(txt[idx-50:idx+500])

