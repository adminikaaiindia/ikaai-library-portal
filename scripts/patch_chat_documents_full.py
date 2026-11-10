import re
import os

print("--- PATCHING CHAT & DOCUMENTS IN INDEX.HTML, STYLES.CSS, APP.JS ---")

# 1. PATCH INDEX.HTML
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Add chatUploadStatus before chatPendingFiles if not present
if 'id="chatUploadStatus"' not in html:
    html = html.replace(
        '<div class="chat-composer-pending-files" id="chatPendingFiles"',
        '<div class="chat-upload-status" id="chatUploadStatus" style="display: none;"></div>\n              <div class="chat-composer-pending-files" id="chatPendingFiles"'
    )

# Update accept attribute on chatFileInput
html = re.sub(
    r'<input type="file" id="chatFileInput"[^>]*>',
    '<input type="file" id="chatFileInput" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar,.png,.jpg,.jpeg,.gif,.webp" style="display: none;">',
    html
)

# Update cache buster to 20261106_v4
html = html.replace('v=20261106_v3', 'v=20261106_v4')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated index.html successfully.")


# 2. PATCH STYLES.CSS
with open("styles.css", "r", encoding="utf-8") as f:
    css = f.read()

# Ensure z-index on select-chevron
old_chevron_css = """.details-setting-field .select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--chat-text-muted, #64748b);
  pointer-events: none;
  display: block;
}"""

new_chevron_css = """.details-setting-field .select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--chat-text-muted, #64748b);
  pointer-events: none;
  display: block;
  z-index: 5 !important;
}"""

if old_chevron_css in css:
    css = css.replace(old_chevron_css, new_chevron_css)

# Add enhanced styles for document chips and upload status
custom_doc_styles = """
/* Upload Status in Composer */
.chat-upload-status {
  padding: 6px 12px;
  background-color: rgba(0, 165, 68, 0.12);
  border: 1px solid rgba(0, 165, 68, 0.3);
  border-radius: 6px;
  font-size: 12px;
  color: #00a544;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

/* Enhanced Chat File Chip & Download Action */
.chat-file-chip {
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 8px 12px !important;
  background-color: var(--chat-bg-card, #141720) !important;
  border: 1px solid var(--chat-border, #1e2330) !important;
  border-radius: 8px !important;
  font-size: 12.5px !important;
  color: var(--chat-text, #f8fafc) !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: all 0.18s ease !important;
  max-width: 320px !important;
  box-sizing: border-box !important;
}

[data-theme="light"] .chat-file-chip {
  background-color: #f8fafc !important;
  border-color: #e2e8f0 !important;
  color: #0f172a !important;
}

.chat-file-chip:hover {
  border-color: #00a544 !important;
  background-color: rgba(0, 165, 68, 0.05) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

.chat-file-meta {
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  min-width: 0 !important;
  flex: 1 !important;
}

.chat-file-name {
  font-weight: 600 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 180px !important;
}

.chat-file-size {
  font-size: 11px !important;
  color: var(--chat-text-dim, #94a3b8) !important;
}

.chat-file-dl-btn {
  background: transparent !important;
  border: none !important;
  color: #00a544 !important;
  cursor: pointer !important;
  padding: 5px !important;
  border-radius: 5px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: background-color 0.15s, transform 0.15s !important;
}

.chat-file-dl-btn:hover {
  background-color: rgba(0, 165, 68, 0.15) !important;
  transform: translateY(-1px) !important;
}
"""

if ".chat-upload-status" not in css:
    css += "\n" + custom_doc_styles

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)
print("Updated styles.css successfully.")


# 3. PATCH APP.JS
with open("app.js", "r", encoding="utf-8") as f:
    app = f.read()

# Replace handleFileInput and renderPendingFiles
old_handle_file_target = """  // Pending file attachments in composer
  function handleFileInput(files) {
    if (!files || files.length === 0) return;
    if (state.pendingFiles.length + files.length > 5) {
      alert('You can attach a maximum of 5 files per message.');
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds the 10 MB limit.`);
        return;
      }

      // Read as Data URL for local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        state.pendingFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: e.target.result
        });
        renderPendingFiles();
      };
      reader.readAsDataURL(file);
    });
  }"""

new_handle_file_target = """  // Pending file attachments in composer (Smooth documents & media uploading)
  function handleFileInput(files) {
    if (!files || files.length === 0) return;
    if (state.pendingFiles.length + files.length > 5) {
      alert('You can attach a maximum of 5 files per message.');
      return;
    }

    Array.from(files).forEach(file => {
      if (file.size > 50 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 50 MB limit.`);
        return;
      }

      // Read as Data URL for local preview and preserve raw file object for upload
      const reader = new FileReader();
      reader.onload = (e) => {
        state.pendingFiles.push({
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          url: e.target.result,
          fileObj: file
        });
        renderPendingFiles();
      };
      reader.readAsDataURL(file);
    });
  }"""

if old_handle_file_target in app:
    app = app.replace(old_handle_file_target, new_handle_file_target)
    print("Replaced handleFileInput in app.js")
else:
    print("WARNING: old_handle_file_target not found in app.js")

# Replace sendMessage
old_send_msg_target = """  // Send a message from composer
  function sendMessage() {
    const textarea = document.getElementById('chatComposerTextarea');
    if (!textarea) return;
    const text = textarea.value.trim();

    if (!text && state.pendingFiles.length === 0) return;

    const conv = getActiveConv();
    const currentUser = getCurrentUser();

    // Check announcement-only
    const isInstructorOrAdmin = currentUser.role === 'instructor' || currentUser.role === 'admin';
    if (conv.isAnnouncementOnly && !isInstructorOrAdmin) {
      alert('This conversation is announcements only. Only instructors can post.');
      return;
    }

    // Create message object
    const newMsg = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      conversationId: conv.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content: text,
      parentMessageId: state.replyingTo ? state.replyingTo.id : null,
      isPinned: false,
      isEdited: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      receipt: 'Sent',
      reactions: [],
      attachments: [...state.pendingFiles]
    };

    if (!state.messages[conv.id]) {
      state.messages[conv.id] = [];
    }
    state.messages[conv.id].push(newMsg);

    // Update conversation metadata
    conv.lastMessage = text.substring(0, 40) || 'Attachment';
    conv.unread = 0;

    // Reset composer
    textarea.value = '';
    state.drafts[conv.id] = '';
    state.pendingFiles = [];
    renderPendingFiles();
    hideReplyBar();
    updateCharCounter();

    // Re-render
    renderMessages();
    renderSidebarLists();

    // Clear typing broadcast if active
    broadcastTyping(false);
  }"""

new_send_msg_target = """  // Send a message from composer with smooth document uploading & database sync
  async function sendMessage() {
    const textarea = document.getElementById('chatComposerTextarea');
    if (!textarea) return;
    const text = textarea.value.trim();

    if (!text && state.pendingFiles.length === 0) return;

    const conv = getActiveConv();
    const currentUser = getCurrentUser();

    // Check announcement-only
    const isInstructorOrAdmin = currentUser.role === 'instructor' || currentUser.role === 'admin';
    if (conv.isAnnouncementOnly && !isInstructorOrAdmin) {
      alert('This conversation is announcements only. Only instructors can post.');
      return;
    }

    const sendBtn = document.getElementById('chatSendButton');
    const uploadStatus = document.getElementById('chatUploadStatus');
    if (sendBtn) sendBtn.disabled = true;

    const filesToUpload = [...state.pendingFiles];
    const finalAttachments = [];

    // Smooth document uploading to Supabase Storage if files are attached
    if (filesToUpload.length > 0) {
      if (uploadStatus) {
        uploadStatus.style.display = 'flex';
        uploadStatus.textContent = `Uploading ${filesToUpload.length} document(s)...`;
      }
      showChatToast(`Uploading ${filesToUpload.length} document(s)...`);

      for (let i = 0; i < filesToUpload.length; i++) {
        const pf = filesToUpload[i];
        if (uploadStatus) {
          uploadStatus.textContent = `Uploading (${i + 1}/${filesToUpload.length}): ${pf.name}...`;
        }

        if (pf.fileObj && window.DataLayer) {
          try {
            const uploaded = await window.DataLayer.uploadChatAttachment(pf.fileObj, conv.id);
            if (uploaded) {
              finalAttachments.push({
                name: uploaded.file_name,
                file_name: uploaded.file_name,
                size: uploaded.file_size,
                file_size: uploaded.file_size,
                type: uploaded.mime_type,
                mime_type: uploaded.mime_type,
                storage_path: uploaded.storage_path,
                public_url: uploaded.file_url,
                url: uploaded.file_url || pf.url
              });
            } else {
              finalAttachments.push({ ...pf });
            }
          } catch (upErr) {
            console.warn('[TeamChat] Document upload error, falling back to local preview:', upErr);
            finalAttachments.push({ ...pf });
          }
        } else {
          finalAttachments.push({ ...pf });
        }
      }
    }

    if (uploadStatus) {
      uploadStatus.style.display = 'none';
      uploadStatus.textContent = '';
    }
    if (sendBtn) sendBtn.disabled = false;

    // Create optimistic message object
    const newMsg = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      conversationId: conv.id,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      senderAvatar: currentUser.avatar,
      content: text,
      parentMessageId: state.replyingTo ? state.replyingTo.id : null,
      isPinned: false,
      isEdited: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      receipt: 'Sent',
      reactions: [],
      attachments: finalAttachments
    };

    if (!state.messages[conv.id]) {
      state.messages[conv.id] = [];
    }
    state.messages[conv.id].push(newMsg);

    // Persist to Supabase database if available
    if (window.DataLayer) {
      try {
        const saved = await window.DataLayer.sendChatMessage({
          conversationId: conv.id,
          content: text,
          parentMessageId: state.replyingTo ? state.replyingTo.id : null,
          sharedItem: null,
          attachments: finalAttachments
        });
        if (saved) {
          newMsg.id = saved.id;
          newMsg.createdAt = saved.created_at || newMsg.createdAt;
          if (saved.attachments && saved.attachments.length > 0) {
            newMsg.attachments = saved.attachments;
          }
        }
      } catch (dbErr) {
        console.warn('[TeamChat] Database persistence error (local fallback active):', dbErr);
      }
    }

    // Update conversation metadata
    conv.lastMessage = text.substring(0, 40) || (finalAttachments.length > 0 ? `📎 ${finalAttachments[0].name}` : 'Document');
    conv.unread = 0;

    // Reset composer
    textarea.value = '';
    state.drafts[conv.id] = '';
    state.pendingFiles = [];
    renderPendingFiles();
    hideReplyBar();
    updateCharCounter();

    // Re-render
    renderMessages();
    renderSidebarLists();
    renderDetailsPanel();

    // Clear typing broadcast if active
    broadcastTyping(false);
  }"""

if old_send_msg_target in app:
    app = app.replace(old_send_msg_target, new_send_msg_target)
    print("Replaced sendMessage in app.js")
else:
    print("WARNING: old_send_msg_target not found in app.js")

# Replace attachments rendering in renderMessages
old_att_render_target = """      // Attachments (Images, PDFs, Docs)
      let attachmentsHtml = '';
      if (msg.attachments && msg.attachments.length > 0) {
        attachmentsHtml = '<div class="chat-msg-attachments">';
        msg.attachments.forEach(att => {
          const isImg = att.type?.startsWith('image/') || /\\.(png|jpe?g|gif|webp)$/i.test(att.name);
          if (isImg) {
            attachmentsHtml += `<img src="${att.url}" alt="${escapeHtml(att.name)}" class="chat-img-thumb" data-full-img="${att.url}">`;
          } else {
            const ext = att.name.split('.').pop().toUpperCase();
            const sizeStr = att.size ? `${(att.size / 1024 / 1024).toFixed(1)} MB` : '';
            attachmentsHtml += `
              <a href="${att.url}" download="${escapeHtml(att.name)}" class="chat-file-chip" target="_blank" rel="noopener">
                <span class="chat-file-ext-badge">${ext}</span>
                <span>${escapeHtml(att.name)}</span>
                <small style="color: var(--chat-text-dim);">${sizeStr}</small>
              </a>
            `;
          }
        });
        attachmentsHtml += '</div>';
      }"""

new_att_render_target = """      // Attachments (Images, PDFs, Docs) with smooth downloading support
      let attachmentsHtml = '';
      if (msg.attachments && msg.attachments.length > 0) {
        attachmentsHtml = '<div class="chat-msg-attachments">';
        msg.attachments.forEach(att => {
          const fname = att.file_name || att.name || 'document';
          const isImg = (att.mime_type || att.type || '').startsWith('image/') || /\\.(png|jpe?g|gif|webp)$/i.test(fname);
          const imgSrc = att.public_url || att.file_url || att.url || '';
          const storagePath = att.storage_path || '';

          if (isImg && imgSrc) {
            attachmentsHtml += `<img src="${imgSrc}" alt="${escapeHtml(fname)}" class="chat-img-thumb" data-full-img="${imgSrc}">`;
          } else {
            const ext = fname.split('.').pop().toUpperCase();
            const rawSize = att.file_size || att.size || 0;
            const sizeStr = rawSize > (1024 * 1024) 
              ? `${(rawSize / 1024 / 1024).toFixed(1)} MB` 
              : (rawSize > 0 ? `${Math.round(rawSize / 1024)} KB` : '');

            attachmentsHtml += `
              <div class="chat-file-chip" data-storage-path="${escapeHtml(storagePath)}" data-file-name="${escapeHtml(fname)}" data-direct-url="${escapeHtml(imgSrc)}" title="Click to download ${escapeHtml(fname)}">
                <span class="chat-file-ext-badge">${ext}</span>
                <div class="chat-file-meta">
                  <span class="chat-file-name">${escapeHtml(fname)}</span>
                  ${sizeStr ? `<small class="chat-file-size">${sizeStr}</small>` : ''}
                </div>
                <button type="button" class="chat-file-dl-btn" title="Download document">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            `;
          }
        });
        attachmentsHtml += '</div>';
      }"""

if old_att_render_target in app:
    app = app.replace(old_att_render_target, new_att_render_target)
    print("Replaced attachments rendering in app.js")
else:
    print("WARNING: old_att_render_target not found in app.js")

# Add downloadChatAttachment function and wire up attachment clicks
helper_and_wiring_code = """
  // Smooth document downloading helper
  async function downloadChatAttachment(storagePath, fileName, directUrl) {
    if (!fileName) fileName = 'document';
    showChatToast(`Preparing download: ${fileName}...`);

    let downloadUrl = directUrl;
    if (storagePath && window.DataLayer && !storagePath.startsWith('local/')) {
      try {
        const signed = await window.DataLayer.getChatAttachmentDownloadUrl(storagePath, fileName);
        if (signed) downloadUrl = signed;
      } catch (err) {
        console.warn('Could not generate signed download URL:', err);
      }
    }

    if (!downloadUrl) {
      alert('File is not uploaded or link is unavailable.');
      return;
    }

    // Trigger instant smooth browser download
    try {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1000);
      showChatToast(`Downloading: ${fileName}`);
    } catch (e) {
      window.open(downloadUrl, '_blank');
    }
  }

  // Asynchronously load conversation messages from Supabase database
  async function loadConversationMessages(convId) {
    if (!convId || !window.DataLayer) return;
    try {
      const dbMsgs = await window.DataLayer.getChatMessages(convId);
      if (dbMsgs && dbMsgs.length > 0) {
        state.messages[convId] = dbMsgs.map(m => ({
          id: m.id,
          conversationId: m.conversation_id,
          senderId: m.sender_id,
          senderName: m.sender_name,
          senderRole: m.sender_role,
          senderAvatar: m.sender_avatar,
          content: m.content,
          parentMessageId: m.parent_message_id,
          sharedItem: m.shared_item,
          isPinned: m.is_pinned,
          isEdited: m.is_edited,
          isDeleted: m.is_deleted,
          createdAt: m.created_at,
          receipt: 'Seen',
          reactions: (m.reactions || []).reduce((acc, r) => {
            const existing = acc.find(x => x.emoji === r.emoji);
            if (existing) {
              existing.count++;
              existing.users.push(r.user_name);
            } else {
              acc.push({ emoji: r.emoji, count: 1, users: [r.user_name] });
            }
            return acc;
          }, []),
          attachments: (m.attachments || []).map(a => ({
            id: a.id,
            name: a.file_name,
            file_name: a.file_name,
            size: a.file_size,
            file_size: a.file_size,
            type: a.mime_type,
            mime_type: a.mime_type,
            storage_path: a.storage_path,
            public_url: a.public_url,
            url: a.public_url || ''
          }))
        }));

        if (state.activeConvId === convId) {
          renderMessages();
          renderPinnedBanner();
          renderDetailsPanel();
        }
      }
    } catch (e) {
      console.warn('[TeamChat] Failed to load messages from DB:', e);
    }
  }
"""

# Insert helpers right before wireMessageEventListeners
if "function wireMessageEventListeners(row, msg) {" in app:
    app = app.replace(
        "function wireMessageEventListeners(row, msg) {",
        helper_and_wiring_code + "\n  function wireMessageEventListeners(row, msg) {"
    )
    print("Inserted downloadChatAttachment and loadConversationMessages in app.js")

# In wireMessageEventListeners, wire attachment clicks
wiring_target = """    // Action bar reactions
    row.querySelectorAll('[data-react]').forEach(btn => {"""

wiring_replacement = """    // Wire document chips and download buttons
    row.querySelectorAll('.chat-file-chip, .chat-file-dl-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const chip = btn.closest('.chat-file-chip');
        if (chip) {
          const path = chip.getAttribute('data-storage-path');
          const fname = chip.getAttribute('data-file-name');
          const direct = chip.getAttribute('data-direct-url');
          downloadChatAttachment(path, fname, direct);
        }
      });
    });

    // Wire thumbnail images for full-screen lightbox preview
    row.querySelectorAll('.chat-img-thumb').forEach(img => {
      img.addEventListener('click', () => {
        openLightbox(img.getAttribute('data-full-img'));
      });
    });

    // Action bar reactions
    row.querySelectorAll('[data-react]').forEach(btn => {"""

if wiring_target in app:
    app = app.replace(wiring_target, wiring_replacement)
    print("Wired document and image click handlers in wireMessageEventListeners")

# In selectConversation, trigger loadConversationMessages
select_conv_target = """    renderActiveConversationHeader();
    renderPinnedBanner();
    renderMessages();
    renderDetailsPanel();"""

select_conv_replacement = """    renderActiveConversationHeader();
    renderPinnedBanner();
    renderMessages();
    renderDetailsPanel();

    // Asynchronously fetch latest messages and shared documents from Supabase database
    loadConversationMessages(convId);"""

if select_conv_target in app:
    app = app.replace(select_conv_target, select_conv_replacement)
    print("Updated selectConversation to load messages from database")

# In renderDetailsPanel, enhance Shared Files listing
shared_files_old = """    // Files list in details
    const filesListEl = document.getElementById('detailsFilesList');
    const filesCountEl = document.getElementById('detailsFilesCount');
    if (filesListEl && filesCountEl) {
      const allFiles = [];
      const convMsgs = state.messages[conv.id] || [];
      convMsgs.forEach(m => {
        if (m.attachments) {
          allFiles.push(...m.attachments);
        }
      });
      filesCountEl.textContent = allFiles.length;
      filesListEl.innerHTML = '';
      if (allFiles.length === 0) {
        filesListEl.innerHTML = '<div class="details-empty-note">No shared files in this conversation</div>';
      } else {
        allFiles.forEach(f => {
          const item = document.createElement('div');
          item.className = 'details-file-item';
          item.innerHTML = `
            <span class="chat-file-ext-badge">${f.name.split('.').pop().toUpperCase()}</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">${escapeHtml(f.name)}</span>
          `;
          filesListEl.appendChild(item);
        });
      }
    }"""

shared_files_new = """    // Files list in details with smooth download triggers
    const filesListEl = document.getElementById('detailsFilesList');
    const filesCountEl = document.getElementById('detailsFilesCount');
    if (filesListEl && filesCountEl) {
      const allFiles = [];
      const convMsgs = state.messages[conv.id] || [];
      convMsgs.forEach(m => {
        if (m.attachments && m.attachments.length > 0) {
          allFiles.push(...m.attachments);
        }
      });
      filesCountEl.textContent = allFiles.length;
      filesListEl.innerHTML = '';
      if (allFiles.length === 0) {
        filesListEl.innerHTML = '<div class="details-empty-note">No shared files in this conversation</div>';
      } else {
        allFiles.forEach(f => {
          const fname = f.file_name || f.name || 'document';
          const ext = fname.split('.').pop().toUpperCase();
          const item = document.createElement('div');
          item.className = 'details-file-item';
          item.style.cursor = 'pointer';
          item.title = `Click to download ${escapeHtml(fname)}`;
          item.innerHTML = `
            <span class="chat-file-ext-badge">${ext}</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">${escapeHtml(fname)}</span>
          `;
          item.addEventListener('click', () => {
            downloadChatAttachment(f.storage_path, fname, f.public_url || f.url);
          });
          filesListEl.appendChild(item);
        });
      }
    }"""

if shared_files_old in app:
    app = app.replace(shared_files_old, shared_new := shared_files_new)
    print("Updated shared files listing in renderDetailsPanel")

# In initRealtimeSync, add postgres_changes listener for chat_messages
rt_old = """      state.supabaseChannel = client.channel('ikaai-team-chat')
        .on('broadcast', { event: 'typing' }, (payload) => {"""

rt_new = """      // Live database sync for incoming messages and documents
      client.channel('chat-messages-live')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, async (payload) => {
          const row = payload.new;
          if (!row) return;
          const currentUser = getCurrentUser();
          if (row.sender_id && row.sender_id === currentUser.id) return;

          if (row.conversation_id === state.activeConvId) {
            await loadConversationMessages(state.activeConvId);
            showChatToast(`New message from ${row.sender_name}`);
          } else {
            const targetConv = state.conversations.find(c => c.id === row.conversation_id);
            if (targetConv) {
              targetConv.unread = (targetConv.unread || 0) + 1;
              targetConv.lastMessage = row.content?.substring(0, 40) || 'Attachment';
              renderSidebarLists();
            }
          }
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chat_messages' }, async (payload) => {
          const row = payload.new;
          if (row && row.conversation_id === state.activeConvId) {
            await loadConversationMessages(state.activeConvId);
          }
        })
        .subscribe();

      state.supabaseChannel = client.channel('ikaai-team-chat')
        .on('broadcast', { event: 'typing' }, (payload) => {"""

if rt_old in app:
    app = app.replace(rt_old, rt_new)
    print("Enhanced initRealtimeSync with postgres_changes listener")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(app)
print("Updated app.js successfully.")

