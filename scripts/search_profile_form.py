import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('profileActionsForm')
print('profileActionsForm index:', idx)
if idx != -1:
    print(app[idx-50:idx+600])

idx_name = app.find('userNameInput')
print('userNameInput index:', idx_name)
if idx_name != -1:
    print(app[idx_name-50:idx_name+600])

