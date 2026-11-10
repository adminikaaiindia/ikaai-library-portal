with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace("v=20261106_v7", "v=20261106_v8")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Bumped cache busters to v=20261106_v8")
