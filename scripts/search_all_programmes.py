import os

for root, dirs, files in os.walk('.'):
    if '.git' in root or 'node_modules' in root or '.gemini' in root:
        continue
    for f in files:
        if f.endswith('.sql') or f.endswith('.js'):
            path = os.path.join(root, f)
            try:
                with open(path, encoding='utf-8') as file_obj:
                    txt = file_obj.read()
                    if 'programmes' in txt and ('Human Resources' in txt or 'data-analyst' in txt):
                        if 'insert' in txt.lower():
                            print(f"Found in {path}")
            except Exception:
                pass

