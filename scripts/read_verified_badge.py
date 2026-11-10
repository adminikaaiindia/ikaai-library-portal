with open('styles.css', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.status-verified-badge')
if idx != -1:
    print(css[idx-50:idx+400])

