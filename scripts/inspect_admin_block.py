with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(7250, 7390):
    print(f"{j+1}: {lines[j]}", end="")

