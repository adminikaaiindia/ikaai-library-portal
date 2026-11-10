with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('async function renderAdminPortal()')
if idx == -1:
    idx = app.find('function renderAdminPortal()')
print(app[idx+1000:idx+2500])

