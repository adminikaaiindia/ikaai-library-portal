with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('function updateUserAvatarUI()')
print(app[idx+400:idx+1500])

