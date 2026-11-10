import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data.js', encoding='utf-8') as f:
    data = f.read()

idx = data.find('getMyProfile')
print('getMyProfile in data.js:', idx)
if idx != -1:
    print(data[idx-50:idx+1200])

