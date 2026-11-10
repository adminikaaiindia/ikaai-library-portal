with open('styles.css', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.account-info-card')
if idx != -1:
    print(css[idx-50:idx+600])
else:
    print("account-info-card not in styles.css")

