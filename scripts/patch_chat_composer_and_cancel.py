def patch_all():
    # 1. Patch index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find chat-format-toolbar block
    old_toolbar_start = '              <!-- Formatting Toolbar -->'
    old_toolbar_end = '              </div>\n\n              <!-- Pending Attached Files Preview -->'
    
    idx_start = html.find(old_toolbar_start)
    idx_end = html.find(old_toolbar_end)

    if idx_start != -1 and idx_end != -1:
        html = html[:idx_start] + '              <!-- Formatting Toolbar Removed by User Request -->\n' + html[idx_end + len('              </div>\n\n'):]
        print("Removed chatFormatToolbar from index.html")
    else:
        # fallback regex
        import re
        html = re.sub(r'<!-- Formatting Toolbar -->[\s\S]*?id="chatFormatToolbar"[\s\S]*?</div>\s*', '<!-- Formatting Toolbar Removed -->\n', html)
        print("Removed chatFormatToolbar via regex")

    # Update cache buster
    html = html.replace('?v=20261106_v2', '?v=20261106_v3')

    with open('index.html', 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print("index.html written")

    # 2. Patch app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # Wire cancelChatShareBtn in initShareModal()
    old_init_share = """    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }"""

    new_init_share = """    if (closeBtn) {
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

    assert old_init_share in js, "old_init_share not found in app.js"
    js = js.replace(old_init_share, new_init_share, 1)

    # Wire cancelChatGroupBtn in initNewChatModal()
    old_close_group = """    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }"""

    new_close_group = """    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    const cancelGroupBtn = document.getElementById('cancelChatGroupBtn');
    if (cancelGroupBtn) {
      cancelGroupBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });"""

    assert old_close_group in js, "old_close_group not found in app.js"
    js = js.replace(old_close_group, new_close_group, 1)

    with open('app.js', 'w', encoding='utf-8', newline='') as f:
        f.write(js)
    print("app.js written")

if __name__ == '__main__':
    patch_all()

