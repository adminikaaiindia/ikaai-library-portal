import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data.js', encoding='utf-8') as f:
    data = f.read()

idx = data.find('// 8. PROFILE & ACCOUNT SETTINGS')
print('Section 8 in data.js:', idx)
if idx != -1:
    print(data[idx:idx+1500])

