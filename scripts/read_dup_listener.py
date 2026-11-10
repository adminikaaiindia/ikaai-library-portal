with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('el.profileActionsForm', 450000)
if idx != -1:
    print("Found duplicate listener at", idx, ":")
    print(app[idx-50:idx+800])
else:
    print("No duplicate listener after 450000")

