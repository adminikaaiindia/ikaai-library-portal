import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data.js', encoding='utf-8') as f:
    data = f.read()

idx = data.find('// 8. PROFILE & ACCOUNT SETTINGS')
print(data[idx+1000:idx+2500])

