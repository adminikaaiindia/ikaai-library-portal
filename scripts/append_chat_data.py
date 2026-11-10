import os

file_path = "data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = """        if (search && search.trim()) {
          const s = search.trim().toLowerCase();
          const matchTitle = (d.title || "").toLowerCase().includes(s);
          const matchDesc = (d.description || "").toLowerCase().includes(s);
          const matchCat = (d.category || "").toLowerCase().includes(s);
          const matchRecip = (d.recipient?.full_name || "").toLowerCase().includes(s) || (d.recipient?.email || "").toLowerCase().includes(s);
          if (!matchTitle && !matchDesc && !matchCat && !matchRecip) return false;
        }
        return true;
      });
    }
  };

  window.DataLayer = DataLayer;
})();"""

replacement = """        if (search && search.trim()) {
          const s = search.trim().toLowerCase();
          const matchTitle = (d.title || "").toLowerCase().includes(s);
          const matchDesc = (d.description || "").toLowerCase().includes(s);
          const matchCat = (d.category || "").toLowerCase().includes(s);
          const matchRecip = (d.recipient?.full_name || "").toLowerCase().includes(s) || (d.recipient?.email || "").toLowerCase().includes(s);
          if (!matchTitle && !matchDesc && !matchCat && !matchRecip) return false;
        }
        return true;
      });
    },

    // ------------------------------------------------------------------------
    // 10. REAL-TIME TEAM CHAT & DOCUMENTS
    // ------------------------------------------------------------------------
    async getChatConversations(programmeId, userProgrammeSlug) {
      const client = getClient();
      if (!isLive() || !client) return null;

      try {
        const { data, error } = await client
          .from('chat_conversations')
          .select(`
            *,
            members:chat_conversation_members(user_id, role, is_muted, notification_pref)
          `)
          .order('last_message_at', { ascending: false });

        if (error) {
          console.warn('[DataLayer] getChatConversations error:', error);
          return null;
        }
        return data;
      } catch (err) {
        console.warn('[DataLayer] getChatConversations exception:', err);
        return null;
      }
    },

    async getChatMessages(conversationId) {
      const client = getClient();
      if (!isLive() || !client || !conversationId) return null;

      try {
        const { data: messages, error: msgError } = await client
          .from('chat_messages')
          .select(`
            *,
            attachments:chat_attachments(*),
            reactions:chat_reactions(*)
          `)
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (msgError) {
          console.warn('[DataLayer] getChatMessages error:', msgError);
          return null;
        }
        return messages;
      } catch (err) {
        console.warn('[DataLayer] getChatMessages exception:', err);
        return null;
      }
    },

    async uploadChatAttachment(file, conversationId) {
      const client = getClient();
      if (!isLive() || !client || !file) {
        // Local / demo fallback
        const localUrl = URL.createObjectURL(file);
        return {
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type || 'application/octet-stream',
          storage_path: `local/${Date.now()}_${file.name}`,
          file_url: localUrl
        };
      }

      // Generate a clean safe storage path
      const safeConvId = conversationId || 'general';
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `${safeConvId}/${Date.now()}_${cleanFileName}`;

      const { data: uploadData, error: uploadError } = await client.storage
        .from('chat-attachments')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('[DataLayer] uploadChatAttachment error:', uploadError);
        throw new Error(`Document upload failed: ${uploadError.message}`);
      }

      let fileUrl = null;
      try {
        const { data: pubData } = client.storage.from('chat-attachments').getPublicUrl(storagePath);
        if (pubData && pubData.publicUrl) fileUrl = pubData.publicUrl;
      } catch (e) {
        // signed URL will be used instead
      }

      return {
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type || 'application/octet-stream',
        storage_path: storagePath,
        file_url: fileUrl
      };
    },

    async getChatAttachmentDownloadUrl(storagePath, fileName) {
      if (!storagePath) return null;
      if (storagePath.startsWith('blob:') || storagePath.startsWith('data:') || storagePath.startsWith('http')) {
        return storagePath;
      }
      const client = getClient();
      if (!isLive() || !client) return null;

      try {
        const { data, error } = await client.storage
          .from('chat-attachments')
          .createSignedUrl(storagePath, 3600, {
            download: fileName || true
          });
        if (!error && data?.signedUrl) return data.signedUrl;

        // Fallback to public URL
        const { data: pub } = client.storage.from('chat-attachments').getPublicUrl(storagePath);
        return pub?.publicUrl || null;
      } catch (err) {
        console.warn('[DataLayer] getChatAttachmentDownloadUrl error:', err);
        return null;
      }
    },

    async sendChatMessage({ conversationId, content, parentMessageId, sharedItem, attachments = [] }) {
      const client = getClient();
      const currentUser = await window.SupabaseClient.getUser();
      const profile = await DataLayer.getMyProfile();

      if (!isLive() || !client || !currentUser) {
        return null; // Fallback to local in-memory
      }

      const senderName = profile?.full_name || profile?.display_name || currentUser.email.split('@')[0];
      const senderRole = profile?.role || 'learner';
      const senderAvatar = (senderName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U').toUpperCase();

      // 1. Insert chat message
      const { data: newMsg, error: msgError } = await client
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.id,
          sender_name: senderName,
          sender_role: senderRole,
          sender_avatar: senderAvatar,
          content: content || '',
          parent_message_id: parentMessageId || null,
          shared_item: sharedItem || null
        })
        .select()
        .single();

      if (msgError) {
        console.error('[DataLayer] sendChatMessage error:', msgError);
        throw msgError;
      }

      // 2. Insert chat attachments if any
      const insertedAttachments = [];
      if (attachments && attachments.length > 0) {
        const attRows = attachments.map(att => ({
          message_id: newMsg.id,
          conversation_id: conversationId,
          file_name: att.file_name || att.name,
          file_size: att.file_size || att.size || 0,
          mime_type: att.mime_type || att.type || 'application/octet-stream',
          storage_path: att.storage_path,
          public_url: att.file_url || null,
          uploaded_by: currentUser.id
        }));

        const { data: attData, error: attErr } = await client
          .from('chat_attachments')
          .insert(attRows)
          .select();

        if (attErr) {
          console.warn('[DataLayer] failed inserting chat_attachments rows:', attErr);
        } else if (attData) {
          insertedAttachments.push(...attData);
        }
      }

      return {
        ...newMsg,
        attachments: insertedAttachments,
        reactions: []
      };
    },

    async toggleChatReaction(messageId, emoji) {
      const client = getClient();
      const currentUser = await window.SupabaseClient.getUser();
      if (!isLive() || !client || !currentUser || !messageId || !emoji) return null;

      const profile = await DataLayer.getMyProfile();
      const userName = profile?.full_name || currentUser.email.split('@')[0];

      // Check if reaction already exists
      const { data: existing } = await client
        .from('chat_reactions')
        .select('id')
        .eq('message_id', messageId)
        .eq('user_id', currentUser.id)
        .eq('emoji', emoji)
        .maybeSingle();

      if (existing) {
        await client.from('chat_reactions').delete().eq('id', existing.id);
        return { action: 'removed', emoji };
      } else {
        await client.from('chat_reactions').insert({
          message_id: messageId,
          user_id: currentUser.id,
          user_name: userName,
          emoji: emoji
        });
        return { action: 'added', emoji };
      }
    },

    async pinChatMessage(messageId, isPinned) {
      const client = getClient();
      if (!isLive() || !client || !messageId) return false;
      const { error } = await client
        .from('chat_messages')
        .update({ is_pinned: isPinned, updated_at: new Date().toISOString() })
        .eq('id', messageId);
      return !error;
    },

    async deleteChatMessage(messageId) {
      const client = getClient();
      if (!isLive() || !client || !messageId) return false;
      const { error } = await client
        .from('chat_messages')
        .update({ is_deleted: true, content: 'This message was deleted.', updated_at: new Date().toISOString() })
        .eq('id', messageId);
      return !error;
    },

    async editChatMessage(messageId, newContent) {
      const client = getClient();
      if (!isLive() || !client || !messageId) return false;
      const { error } = await client
        .from('chat_messages')
        .update({ content: newContent, is_edited: true, updated_at: new Date().toISOString() })
        .eq('id', messageId);
      return !error;
    },

    async createChatGroup({ name, description, memberIds = [], programmeId = null, programmeSlug = 'hr' }) {
      const client = getClient();
      const currentUser = await window.SupabaseClient.getUser();
      if (!isLive() || !client || !currentUser) return null;

      const { data: conv, error: convErr } = await client
        .from('chat_conversations')
        .insert({
          name,
          description: description || null,
          type: 'group',
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          programme_id: programmeId,
          programme_slug: programmeSlug,
          created_by: currentUser.id
        })
        .select()
        .single();

      if (convErr || !conv) throw convErr || new Error('Could not create group.');

      const allMembers = Array.from(new Set([currentUser.id, ...memberIds]));
      const memberRows = allMembers.map(uid => ({
        conversation_id: conv.id,
        user_id: uid,
        role: uid === currentUser.id ? 'admin' : 'member'
      }));

      await client.from('chat_conversation_members').insert(memberRows);
      return conv;
    },

    async addMembersToChatGroup(conversationId, memberIds = []) {
      const client = getClient();
      if (!isLive() || !client || !conversationId || memberIds.length === 0) return false;

      const rows = memberIds.map(uid => ({
        conversation_id: conversationId,
        user_id: uid,
        role: 'member'
      }));

      const { error } = await client
        .from('chat_conversation_members')
        .insert(rows);

      return !error;
    },

    async getChatSharedFiles(conversationId) {
      const client = getClient();
      if (!isLive() || !client || !conversationId) return [];

      const { data, error } = await client
        .from('chat_attachments')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[DataLayer] getChatSharedFiles error:', error);
        return [];
      }
      return data || [];
    }
  };

  window.DataLayer = DataLayer;
})();"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESS: Appended chat & document methods to DataLayer in data.js")
else:
    print("ERROR: Target block not found in data.js")

