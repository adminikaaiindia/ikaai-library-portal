import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('function updateUserAvatarUI()')
print('updateUserAvatarUI in app.js:', idx)
if idx != -1:
    print(app[idx:idx+1200])

