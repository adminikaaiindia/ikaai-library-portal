import re

def patch_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Wrap detailsMuteSelect and detailsNotifyPrefSelect in custom-select-wrapper
    old_notif_block = """              <div class="details-setting-field">
                <label for="detailsMuteSelect" class="details-sublabel">Mute Conversation</label>
                <select id="detailsMuteSelect" class="modal-input-control modal-select-control small-select">
                  <option value="off">Off (notify me)</option>
                  <option value="1h">For 1 hour</option>
                  <option value="8h">For 8 hours</option>
                  <option value="1w">For 1 week</option>
                  <option value="always">Until I unmute</option>
                </select>
              </div>

              <div class="details-setting-field">
                <label for="detailsNotifyPrefSelect" class="details-sublabel">Notification Level</label>
                <select id="detailsNotifyPrefSelect" class="modal-input-control modal-select-control small-select">
                  <option value="all">All messages</option>
                  <option value="mentions">Mentions only (@you, @everyone)</option>
                  <option value="none">Nothing</option>
                </select>
              </div>"""

    chevron_svg = '<svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>'

    new_notif_block = f"""              <div class="details-setting-field">
                <label for="detailsMuteSelect" class="details-sublabel">Mute Conversation</label>
                <div class="custom-select-wrapper">
                  <select id="detailsMuteSelect" class="modal-input-control modal-select-control small-select">
                    <option value="off">Off (notify me)</option>
                    <option value="1h">For 1 hour</option>
                    <option value="8h">For 8 hours</option>
                    <option value="1w">For 1 week</option>
                    <option value="always">Until I unmute</option>
                  </select>
                  {chevron_svg}
                </div>
              </div>

              <div class="details-setting-field">
                <label for="detailsNotifyPrefSelect" class="details-sublabel">Notification Level</label>
                <div class="custom-select-wrapper">
                  <select id="detailsNotifyPrefSelect" class="modal-input-control modal-select-control small-select">
                    <option value="all">All messages</option>
                    <option value="mentions">Mentions only (@you, @everyone)</option>
                    <option value="none">Nothing</option>
                  </select>
                  {chevron_svg}
                </div>
              </div>"""

    assert old_notif_block in c, "old_notif_block not found in index.html"
    c = c.replace(old_notif_block, new_notif_block, 1)

    # 2. Add #chatAddMemberModal after #chatNewModal if not already present
    if 'id="chatAddMemberModal"' not in c:
        target_after = '<!-- 2. SHARE PORTAL CONTENT MODAL (Module, JD, FAQ) -->'
        add_member_modal_html = """    <!-- 1B. ADD MEMBERS TO GROUP MODAL -->
    <div class="modal-overlay" id="chatAddMemberModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="chatAddMemberModalTitle">
      <div class="modal-card chat-new-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">GROUP CONVERSATION</span>
            <h3 class="modal-title" id="chatAddMemberModalTitle">Add Members to Group</h3>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeChatAddMemberModalBtn" aria-label="Close modal">&times;</button>
        </div>

        <div class="chat-modal-body" style="padding: 20px;">
          <div class="modal-form-group">
            <label class="modal-field-label">Select Members to Add</label>
            <input type="text" id="chatAddMemberSearchInput" class="modal-input-control" placeholder="Search members by name or email...">
          </div>
          <div class="selected-member-chips" id="chatAddMemberSelectedChips" style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 6px;"></div>
          <div class="chat-user-picker-list" id="chatAddMemberUserList" style="max-height: 240px; overflow-y: auto;"></div>

          <div class="modal-footer" style="margin-top: 18px; display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" class="btn-modal-cancel" id="cancelChatAddMemberBtn">Cancel</button>
            <button type="button" class="primary-accent-btn" id="confirmChatAddMemberBtn" disabled>Add Selected Members</button>
          </div>
        </div>
      </div>
    </div>

    """
        assert target_after in c, "target_after not found in index.html"
        c = c.replace(target_after, add_member_modal_html + target_after, 1)

    # Update cache buster
    c = c.replace('?v=20261106_v1', '?v=20261106_v2')

    with open('index.html', 'w', encoding='utf-8', newline='') as f:
        f.write(c)
    print("index.html patched successfully")


def patch_styles_css():
    with open('styles.css', 'r', encoding='utf-8') as f:
        c = f.read()

    old_small_select = """.small-select {
  height: 34px !important;
  padding: 0 10px !important;
  font-size: 12px !important;
}"""

    new_small_select = """.details-setting-field .custom-select-wrapper {
  position: relative;
  width: 100%;
  display: block;
}

.details-setting-field .select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--chat-text-muted, #64748b);
  pointer-events: none;
  display: block;
}

.small-select {
  width: 100% !important;
  height: 36px !important;
  padding: 0 34px 0 12px !important;
  font-size: 12.5px !important;
  border-radius: 8px !important;
  background-color: var(--chat-bg-card, #141720) !important;
  color: var(--chat-text, #f8fafc) !important;
  border: 1px solid var(--chat-border, #1e2330) !important;
  cursor: pointer;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

[data-theme="light"] .small-select {
  background-color: #ffffff !important;
  color: #0f172a !important;
  border-color: #cbd5e1 !important;
}

[data-theme="light"] .details-setting-field .select-chevron {
  color: #64748b !important;
}"""

    if old_small_select in c:
        c = c.replace(old_small_select, new_small_select, 1)
    elif ".details-setting-field .select-chevron" not in c:
        c += "\n" + new_small_select

    with open('styles.css', 'w', encoding='utf-8', newline='') as f:
        f.write(c)
    print("styles.css patched successfully")


def patch_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Wire notification settings in renderDetailsPanel()
    target_render_details = "    const announcementToggle = document.getElementById('detailsAnnouncementToggle');"
    notif_sync_code = """    const announcementToggle = document.getElementById('detailsAnnouncementToggle');

    // Notifications & Mute synchronization for active conversation
    const muteSelect = document.getElementById('detailsMuteSelect');
    const notifySelect = document.getElementById('detailsNotifyPrefSelect');
    const dndToggle = document.getElementById('detailsGlobalDndToggle');

    if (muteSelect) {
      muteSelect.value = conv.mute || 'off';
      muteSelect.onchange = () => {
        conv.mute = muteSelect.value;
        showChatToast(conv.mute === 'off' ? 'Conversation unmuted' : `Conversation muted: ${muteSelect.options[muteSelect.selectedIndex].text}`);
      };
    }

    if (notifySelect) {
      notifySelect.value = conv.notifyLevel || 'all';
      notifySelect.onchange = () => {
        conv.notifyLevel = notifySelect.value;
        showChatToast(`Notification level set to ${notifySelect.options[notifySelect.selectedIndex].text}`);
      };
    }

    if (dndToggle) {
      dndToggle.checked = !!state.dndEnabled;
      dndToggle.onchange = () => {
        state.dndEnabled = dndToggle.checked;
        localStorage.setItem('chat_dnd_enabled', state.dndEnabled ? 'true' : 'false');
        showChatToast(state.dndEnabled ? 'Do Not Disturb (DND) turned ON' : 'Do Not Disturb turned OFF');
      };
    }"""

    if target_render_details in c and "detailsMuteSelect" not in c:
        c = c.replace(target_render_details, notif_sync_code, 1)

    # 2. Wire leave group button in renderDetailsPanel()
    old_leave_group = """      if (leaveGroupWrap) {
        leaveGroupWrap.style.display = conv.type === 'group' ? 'block' : 'none';
      }"""

    new_leave_group = """      if (leaveGroupWrap) {
        leaveGroupWrap.style.display = conv.type === 'group' ? 'block' : 'none';
        const leaveBtn = document.getElementById('detailsLeaveGroupBtn');
        if (leaveBtn) {
          leaveBtn.onclick = () => {
            if (confirm(`Are you sure you want to leave "${conv.name}"?`)) {
              handleLeaveGroup(conv);
            }
          };
        }
      }"""

    if old_leave_group in c:
        c = c.replace(old_leave_group, new_leave_group, 1)

    # 3. Add openAddMemberModal implementation and helpers
    add_member_functions = """
  // ==========================================
  // ADD MEMBERS TO GROUP MODAL IMPLEMENTATION
  // ==========================================
  const selectedNewMembersToAdd = new Set();

  function openAddMemberModal() {
    const conv = getActiveConv();
    if (!conv || conv.type !== 'group') return;

    const modal = document.getElementById('chatAddMemberModal');
    const searchInput = document.getElementById('chatAddMemberSearchInput');
    const titleEl = document.getElementById('chatAddMemberModalTitle');
    if (!modal) return;

    selectedNewMembersToAdd.clear();
    if (searchInput) searchInput.value = '';
    if (titleEl) titleEl.textContent = `Add Members to "${conv.name}"`;

    renderAddMembersPicker('');
    modal.style.display = 'flex';
  }

  function closeAddMemberModal() {
    const modal = document.getElementById('chatAddMemberModal');
    if (modal) modal.style.display = 'none';
    selectedNewMembersToAdd.clear();
  }

  function renderAddMembersPicker(query = '') {
    const conv = getActiveConv();
    if (!conv) return;

    const list = document.getElementById('chatAddMemberUserList');
    const chipsContainer = document.getElementById('chatAddMemberSelectedChips');
    const confirmBtn = document.getElementById('confirmChatAddMemberBtn');
    if (!list) return;

    const existingIds = new Set(conv.members || []);
    const q = (query || '').trim().toLowerCase();
    const available = (state.members || []).filter(m => !existingIds.has(m.id) && (m.name.toLowerCase().includes(q) || (m.email || '').toLowerCase().includes(q)));

    if (chipsContainer) {
      chipsContainer.innerHTML = '';
      Array.from(selectedNewMembersToAdd).forEach(id => {
        const mem = (state.members || []).find(m => m.id === id);
        if (!mem) return;
        const chip = document.createElement('span');
        chip.className = 'selected-member-chip';
        chip.style.cssText = 'background: rgba(0, 165, 68, 0.15); border: 1px solid rgba(0, 165, 68, 0.35); color: #00a544; padding: 3px 8px; border-radius: 12px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 6px;';
        chip.innerHTML = `${escapeHtml(mem.name)} <span class="chip-remove" style="cursor: pointer; font-weight: 700;">&times;</span>`;
        chip.querySelector('.chip-remove').addEventListener('click', (e) => {
          e.stopPropagation();
          selectedNewMembersToAdd.delete(mem.id);
          renderAddMembersPicker(query);
        });
        chipsContainer.appendChild(chip);
      });
    }

    if (confirmBtn) {
      confirmBtn.disabled = selectedNewMembersToAdd.size === 0;
    }

    list.innerHTML = '';
    if (available.length === 0) {
      list.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--chat-text-muted); font-size: 13px;">No additional members available to add.</div>`;
      return;
    }

    available.forEach(m => {
      const isSelected = selectedNewMembersToAdd.has(m.id);
      const item = document.createElement('div');
      item.className = `user-picker-item ${isSelected ? 'selected' : ''}`;
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" ${isSelected ? 'checked' : ''} style="accent-color: var(--chat-accent); pointer-events: none;">
          <div>
            <div style="font-weight: 600; font-size: 13px; color: var(--chat-text);">${escapeHtml(m.name)}</div>
            <div style="font-size: 11px; color: var(--chat-text-muted);">${escapeHtml(m.email || '')}</div>
          </div>
        </div>
        <span class="chat-role-badge ${m.role}">${m.role}</span>
      `;
      item.addEventListener('click', () => {
        if (isSelected) {
          selectedNewMembersToAdd.delete(m.id);
        } else {
          selectedNewMembersToAdd.add(m.id);
        }
        renderAddMembersPicker(query);
      });
      list.appendChild(item);
    });
  }

  function confirmAddMembersToGroup() {
    const conv = getActiveConv();
    if (!conv || conv.type !== 'group' || selectedNewMembersToAdd.size === 0) return;

    if (!Array.isArray(conv.members)) conv.members = [];
    const addedNames = [];

    selectedNewMembersToAdd.forEach(id => {
      if (!conv.members.includes(id)) {
        conv.members.push(id);
        const mem = (state.members || []).find(m => m.id === id);
        if (mem) addedNames.push(mem.name);
      }
    });

    conv.memberCount = conv.members.length;

    const currentUser = getCurrentUser();
    const newMsg = {
      id: 'msg-' + Date.now(),
      conversationId: conv.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content: `Added **${addedNames.join(', ')}** to the group.`,
      isPinned: false,
      isEdited: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      receipt: 'Sent',
      reactions: []
    };

    if (!state.messages[conv.id]) state.messages[conv.id] = [];
    state.messages[conv.id].push(newMsg);

    closeAddMemberModal();
    renderConversationStream(conv.id);
    renderActiveConversationHeader();
    renderDetailsPanel();
    renderSidebarLists();
    showChatToast(`Added ${addedNames.length} member(s) to "${conv.name}"`);
  }

  function handleLeaveGroup(conv) {
    const currentUser = getCurrentUser();
    if (!Array.isArray(conv.members)) return;
    conv.members = conv.members.filter(id => id !== currentUser.id);
    conv.memberCount = conv.members.length;

    const leaveMsg = {
      id: 'msg-' + Date.now(),
      conversationId: conv.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content: `*${currentUser.name} left the group.*`,
      isPinned: false,
      isEdited: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      receipt: 'Sent',
      reactions: []
    };
    if (!state.messages[conv.id]) state.messages[conv.id] = [];
    state.messages[conv.id].push(leaveMsg);

    showChatToast(`You left "${conv.name}"`);
    // Switch to all-members or general
    const defaultConv = state.conversations.find(c => c.type === 'all_members') || state.conversations[0];
    if (defaultConv) {
      selectConversation(defaultConv.id);
    }
    renderSidebarLists();
  }
"""

    if "function openAddMemberModal" not in c:
        # insert before initNewChatModal
        target_init = "  // New Chat Modal & Tabs"
        assert target_init in c, "target_init not found in app.js"
        c = c.replace(target_init, add_member_functions + "\n" + target_init, 1)

    # 4. Wire modal buttons in initNewChatModal()
    target_modal_bindings = "    if (createChannelBtn) {\n      createChannelBtn.addEventListener('click', createChannelFromModal);\n    }"
    new_modal_bindings = """    if (createChannelBtn) {
      createChannelBtn.addEventListener('click', createChannelFromModal);
    }

    // Add Member to Group modal event bindings
    const closeAddMemBtn = document.getElementById('closeChatAddMemberModalBtn');
    const cancelAddMemBtn = document.getElementById('cancelChatAddMemberBtn');
    const confirmAddMemBtn = document.getElementById('confirmChatAddMemberBtn');
    const addMemSearchInput = document.getElementById('chatAddMemberSearchInput');

    if (closeAddMemBtn) closeAddMemBtn.addEventListener('click', closeAddMemberModal);
    if (cancelAddMemBtn) cancelAddMemBtn.addEventListener('click', closeAddMemberModal);
    if (confirmAddMemBtn) confirmAddMemBtn.addEventListener('click', confirmAddMembersToGroup);
    if (addMemSearchInput) {
      addMemSearchInput.addEventListener('input', (e) => {
        renderAddMembersPicker(e.target.value);
      });
    }"""

    if target_modal_bindings in c and "closeChatAddMemberModalBtn" not in c:
        c = c.replace(target_modal_bindings, new_modal_bindings, 1)

    with open('app.js', 'w', encoding='utf-8', newline='') as f:
        f.write(c)
    print("app.js patched successfully")


if __name__ == '__main__':
    patch_index_html()
    patch_styles_css()
    patch_app_js()

