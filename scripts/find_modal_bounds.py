with open("index.html", encoding="utf-8") as f:
    lines = f.readlines()

start = None
end = None
for i, line in enumerate(lines):
    if 'id="programmeSelectModal"' in line:
        start = i
    if start is not None and i > start and '</div>' in line:
        # Check if this closes programmeSelectModal
        if '<!-- 1. NEW CHAT MODAL' in lines[i+1] or '<!-- 1. NEW CHAT MODAL' in lines[i+2]:
            end = i
            break

print(f"programmeSelectModal from line {start+1} to {end+1}")
print("Line before:", lines[start-1])
print("Line start:", lines[start])
print("Line end:", lines[end])
print("Line after:", lines[end+1])

