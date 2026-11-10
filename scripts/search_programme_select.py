with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('programmeSelect')
while idx != -1:
    print('programmeSelect at', idx, ':')
    print(app[idx-40:idx+250])
    print('---')
    idx = app.find('programmeSelect', idx+1)

