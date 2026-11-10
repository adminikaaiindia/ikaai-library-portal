import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', encoding='utf-8') as f:
    html = f.read()

start_idx = html.find('id="settingsScreenView"')
end_idx = html.find('<!-- ==========================================', start_idx + 100)
if end_idx == -1:
    end_idx = start_idx + 4000
print("=== HTML SETTINGS SCREEN VIEW ===")
print(html[start_idx:end_idx])

with open('app.js', encoding='utf-8') as f:
    app = f.read()

start_app = app.find('function renderAccountSettingsScreen()')
end_app = app.find('function ', start_app + 100)
print("=== APP.JS RENDER ACCOUNT SETTINGS ===")
print(app[start_app:end_app])
