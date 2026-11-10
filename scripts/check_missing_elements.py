import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("index.html", encoding="utf-8") as f:
    html = f.read()

with open("app.js", encoding="utf-8") as f:
    app_js = f.read()

import re

# Find el.xyz.addEventListener or getElementById('xyz')
el_props = re.findall(r'(\w+):\s*document\.getElementById\([\'"](\w+)[\'"]\)', app_js)
print(f"Total elements defined in el: {len(el_props)}")

missing = []
for prop, el_id in el_props:
    if f'id="{el_id}"' not in html and f"id='{el_id}'" not in html:
        missing.append((prop, el_id))

print(f"Missing element IDs in index.html: {len(missing)}")
for prop, el_id in missing:
    print(f"  Missing: el.{prop} -> id='{el_id}'")

# Check if any missing element is accessed without guard (e.g. el.missing.addEventListener)
print("\nChecking unguarded accesses to missing elements:")
for prop, el_id in missing:
    # Look for el.prop. without if (el.prop)
    pattern = rf'el\.{prop}\.'
    matches = [m.start() for m in re.finditer(pattern, app_js)]
    for pos in matches:
        # Check if preceded by if (el.prop)
        snippet = app_js[max(0, pos-60):min(len(app_js), pos+60)]
        print(f"Access to el.{prop}: {snippet.strip()}")

