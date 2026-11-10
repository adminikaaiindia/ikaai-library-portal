import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('async function initAuthentication()')
if idx == -1:
    idx = app.find('function initAuthentication()')
print('initAuthentication in app.js:', idx)
if idx != -1:
    print(app[idx:idx+1800])

