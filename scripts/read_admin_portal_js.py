with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('async function renderAdminPortal()')
if idx == -1:
    idx = app.find('function renderAdminPortal()')
print('renderAdminPortal in app.js:', idx)
if idx != -1:
    print(app[idx:idx+1500])

