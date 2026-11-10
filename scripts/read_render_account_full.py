with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('function renderAccountSettingsScreen()')
print(app[idx-50:idx+1500])

