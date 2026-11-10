with open("index.html", encoding="utf-8") as f:
    lines = f.readlines()

start = None
end = None
for i, line in enumerate(lines):
    if 'id="adminScreenView"' in line:
        start = i
    if start is not None and i > start and 'id="programmeSelectModal"' in lines[i+2] or (start is not None and i > start and '<!-- FIRST-LOGIN' in lines[i+2]):
        end = i
        break

print(f"adminScreenView from line {start+1} to {end+1}")
print("Line start:", lines[start])
print("Line end:", lines[end])

