with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

print("--- LINES 7350 to 7400 ---")
for j in range(7349, min(len(lines), 7400)):
    print(f"{j+1}: {lines[j]}", end="")

print("\n--- LINES 10380 to 10450 ---")
for j in range(10379, min(len(lines), 10450)):
    print(f"{j+1}: {lines[j]}", end="")

