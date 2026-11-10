import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('styles.css', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.avatar-circle')
print('.avatar-circle in styles.css:', idx)
if idx != -1:
    print(css[idx:idx+500])

