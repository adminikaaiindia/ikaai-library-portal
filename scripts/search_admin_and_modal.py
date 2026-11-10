import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', encoding='utf-8') as f:
    html = f.read()

import re
print("programmeModal in HTML:", 'programmeModal' in html)
if 'programmeModal' in html:
    idx = html.find('programmeModal')
    print(html[idx-100:idx+600])

print("\n--- ADMIN IN HTML ---")
admin_matches = re.findall(r'id=[\"\']([a-zA-Z0-9_-]*admin[a-zA-Z0-9_-]*)[\"\']', html, re.I)
print("Admin IDs in HTML:", admin_matches)

# Screen 10 Admin Portal in HTML
screen_admin_idx = html.find('SCREEN 10')
if screen_admin_idx == -1:
    screen_admin_idx = html.find('adminScreenView')
if screen_admin_idx == -1:
    screen_admin_idx = html.find('admin-view')
if screen_admin_idx == -1:
    screen_admin_idx = html.find('adminPortal')
print("Screen Admin index:", screen_admin_idx)
if screen_admin_idx != -1:
    print(html[screen_admin_idx:screen_admin_idx+1200])

