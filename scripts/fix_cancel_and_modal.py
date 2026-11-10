with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Clean up initNewChatModal
new_lines = []
skip_duplicate_modal_click = False
for i, l in enumerate(lines):
    # Fix the incorrectly placed cancelShareBtn in initNewChatModal
    if "const cancelShareBtn = document.getElementById('cancelChatShareBtn');" in l:
        new_lines.append("    const cancelGroupBtn = document.getElementById('cancelChatGroupBtn');\n")
        continue
    if "if (cancelShareBtn) {" in l:
        new_lines.append("    if (cancelGroupBtn) {\n")
        continue
    if "cancelShareBtn.addEventListener('click', () => {" in l:
        new_lines.append("      cancelGroupBtn.addEventListener('click', () => {\n")
        continue
    new_lines.append(l)

# 2. Add cancelChatShareBtn to initShareModal
full_js = "".join(new_lines)

target_share_close = """    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }"""

# Find target_share_close inside initShareModal
idx_init_share = full_js.find("function initShareModal()")
assert idx_init_share != -1, "initShareModal not found"
idx_close_in_share = full_js.find(target_share_close, idx_init_share)
assert idx_close_in_share != -1, "target_share_close not found in initShareModal"

replacement_share_close = """    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    const cancelShareBtn = document.getElementById('cancelChatShareBtn');
    if (cancelShareBtn) {
      cancelShareBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });"""

full_js = full_js[:idx_close_in_share] + replacement_share_close + full_js[idx_close_in_share + len(target_share_close):]

with open('app.js', 'w', encoding='utf-8', newline='') as f:
    f.write(full_js)

print("Successfully fixed cancel buttons in app.js")

