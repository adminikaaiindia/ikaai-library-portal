import sys

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add GlobalPresence object right before adminPortalCachedUsers
target_gp = "  var adminPortalCachedUsers = [];"

replacement_gp = """  // =========================================================================
  // GLOBAL REALTIME PRESENCE & LAST SEEN TRACKER
  // Tracks active users across the website in real time using Supabase Realtime
  // Presence channels, with automatic database heartbeats and offline sync.
  // =========================================================================
  const GlobalPresence = {
    channel: null,
    onlineUserIds: new Set(),
    heartbeatInterval: null,
    initialized: false,

    getPortalUser() {
      let id = null;
      let name = (state && state.profile && state.profile.name) ? state.profile.name : 'Learner';
      let email = (state && state.profile && state.profile.email) ? state.profile.email.trim().toLowerCase() : '';
      let role = (state && state.profile && state.profile.role) ? state.profile.role : 'learner';

      if (state && state.profile && state.profile.id && state.profile.id !== 'u-anon') {
        id = state.profile.id;
      }
      try {
        const sessionRaw = localStorage.getItem('ikaai_portal_session');
        if (sessionRaw) {
          const u = JSON.parse(sessionRaw);
          if (!id && u.id && u.id !== 'u-anon') id = u.id;
          if (u.name) name = u.name;
          if (u.email) email = u.email.trim().toLowerCase();
          if (u.role) role = u.role;
        }
        if (!id) {
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
              try {
                const val = JSON.parse(localStorage.getItem(key));
                if (val?.user?.id) {
                  id = val.user.id;
                  if (!email && val.user.email) email = val.user.email.trim().toLowerCase();
                  if (val.user.user_metadata?.full_name) name = val.user.user_metadata.full_name;
                  break;
                }
              } catch (e) { }
            }
          }
        }
      } catch (e) { }
      return { id: id || 'u-anon', name, email, role };
    },

    isUserOnline(userOrProfile) {
      if (!userOrProfile) return false;
      const currentUser = this.getPortalUser();
      const uid = userOrProfile.id || userOrProfile.userId;
      const email = (userOrProfile.email || '').toLowerCase().trim();

      // Current user is always online while using the portal
      if (uid && currentUser.id && uid === currentUser.id && uid !== 'u-anon') return true;
      if (email && currentUser.email && email === currentUser.email) return true;

      // Realtime Presence WebSocket check
      if (uid && this.onlineUserIds.has(uid)) return true;
      if (email && this.onlineUserIds.has(email)) return true;

      // Fallback check against last_seen timestamp in database
      const lastSeenIso = userOrProfile.rawLastSeen || userOrProfile.last_seen;
      if (lastSeenIso) {
        const seenDate = new Date(lastSeenIso);
        if (!isNaN(seenDate.getTime())) {
          const diffMins = (Date.now() - seenDate.getTime()) / 60000;
          // Only within 2.5 minutes and status is not explicitly offline
          if (diffMins <= 2.5 && userOrProfile.chat_status !== 'offline') {
            return true;
          }
        }
      }
      return false;
    },

    formatLastSeen(isoStr, isOnline) {
      if (isOnline) return 'Active now';
      if (!isoStr) return 'Offline';
      const date = new Date(isoStr);
      if (isNaN(date.getTime())) return 'Offline';
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);

      const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      if (diffMins < 1) return 'Active just now';
      if (diffMins < 60) return `Active ${diffMins}m ago`;

      const isToday = date.toDateString() === now.toDateString();
      if (isToday) return `Today ${timeStr}`;

      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const isYesterday = date.toDateString() === yesterday.toDateString();
      if (isYesterday) return `Yesterday ${timeStr}`;

      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' ' + timeStr;
    },

    async sendHeartbeat(status = 'online') {
      const client = window.supabaseClient;
      const user = this.getPortalUser();
      if (!client || !user || !user.id || user.id === 'u-anon') return;
      try {
        await client.from('profiles').update({
          last_seen: new Date().toISOString(),
          chat_status: status
        }).eq('id', user.id);
      } catch (e) { }
    },

    syncUI() {
      // 1. Update TeamChat if active
      if (window.TeamChat && typeof window.TeamChat.syncPresenceState === 'function') {
        window.TeamChat.syncPresenceState();
      }
      // 2. Update Admin Directory if visible
      if (activeScreen === 'adminPortal' && typeof renderAdminPortalFilteredTable === 'function') {
        renderAdminPortalFilteredTable();
      }
    },

    init() {
      const client = window.supabaseClient;
      const user = this.getPortalUser();
      if (!client || !user || !user.id || user.id === 'u-anon') return;
      if (this.initialized && this.channel) return;

      this.initialized = true;

      // Update database status immediately
      this.sendHeartbeat('online');

      // Join Realtime presence channel
      try {
        this.channel = client.channel('ikaai-online-presence', {
          config: {
            presence: { key: user.id }
          }
        });

        const parsePresences = () => {
          if (!this.channel) return;
          const presState = this.channel.presenceState();
          const newSet = new Set();
          if (user.id && user.id !== 'u-anon') newSet.add(user.id);
          if (user.email) newSet.add(user.email);

          Object.keys(presState).forEach(k => {
            newSet.add(k);
            const items = presState[k];
            if (Array.isArray(items)) {
              items.forEach(it => {
                if (it.userId) newSet.add(it.userId);
                if (it.user_id) newSet.add(it.user_id);
                if (it.email) newSet.add(it.email.toLowerCase().trim());
              });
            }
          });
          this.onlineUserIds = newSet;
          this.syncUI();
        };

        this.channel
          .on('presence', { event: 'sync' }, () => {
            parsePresences();
          })
          .on('presence', { event: 'join' }, ({ key, newPresences }) => {
            this.onlineUserIds.add(key);
            if (Array.isArray(newPresences)) {
              newPresences.forEach(p => {
                if (p.userId) this.onlineUserIds.add(p.userId);
                if (p.user_id) this.onlineUserIds.add(p.user_id);
                if (p.email) this.onlineUserIds.add(p.email.toLowerCase().trim());
              });
            }
            this.syncUI();
          })
          .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
            if (key !== user.id) {
              this.onlineUserIds.delete(key);
              if (Array.isArray(leftPresences)) {
                leftPresences.forEach(p => {
                  if (p.userId && p.userId !== user.id) this.onlineUserIds.delete(p.userId);
                  if (p.user_id && p.user_id !== user.id) this.onlineUserIds.delete(p.user_id);
                  if (p.email && p.email !== user.email) this.onlineUserIds.delete(p.email.toLowerCase().trim());
                });
              }
            }
            this.syncUI();
          })
          .subscribe(async (subStatus) => {
            if (subStatus === 'SUBSCRIBED') {
              try {
                await this.channel.track({
                  userId: user.id,
                  user_id: user.id,
                  email: user.email,
                  name: user.name,
                  online_at: new Date().toISOString()
                });
              } catch (e) { }
            }
          });

        // Periodic heartbeat every 45s while browser tab is active
        if (!this.heartbeatInterval) {
          this.heartbeatInterval = setInterval(() => {
            if (document.visibilityState === 'visible') {
              this.sendHeartbeat('online');
              if (this.channel) {
                this.channel.track({
                  userId: user.id,
                  user_id: user.id,
                  email: user.email,
                  name: user.name,
                  online_at: new Date().toISOString()
                }).catch(() => {});
              }
            }
          }, 45000);
        }

        window.addEventListener('beforeunload', () => {
          if (this.channel) {
            try { this.channel.untrack(); } catch (e) { }
          }
        });
      } catch (err) {
        console.warn('[GlobalPresence] init error:', err);
      }
    },

    async cleanup() {
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
      }
      if (this.channel) {
        try {
          await this.channel.untrack();
          this.channel.unsubscribe();
        } catch (e) { }
        this.channel = null;
      }
      this.initialized = false;
      this.onlineUserIds.clear();
      await this.sendHeartbeat('offline');
    }
  };

  window.GlobalPresence = GlobalPresence;

  var adminPortalCachedUsers = [];"""

if target_gp in content:
    content = content.replace(target_gp, replacement_gp, 1)
    print("1. Added GlobalPresence object")
else:
    print("Error: target_gp not found!")
    sys.exit(1)

# 2. Update renderAdminPortalFilteredTable lastSeenStr
target_admin_table = """      // Joined/Invited Date
      const joinedDateStr = u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '--';
      const lastSeenStr = u.last_seen ? new Date(u.last_seen).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : (u.is_registered ? 'Never' : 'Invited');"""

replacement_admin_table = """      // Joined/Invited Date
      const joinedDateStr = u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '--';
      const isUserActuallyOnline = (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline)
        ? GlobalPresence.isUserOnline(u)
        : false;
      let lastSeenStr = '--';
      if (isUserActuallyOnline) {
        lastSeenStr = '<span style="display:inline-flex;align-items:center;gap:5px;color:#10b981;font-weight:600;"><span style="width:6px;height:6px;border-radius:50%;background:#10b981;display:inline-block;"></span>Active now</span>';
      } else if (u.last_seen) {
        lastSeenStr = new Date(u.last_seen).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      } else {
        lastSeenStr = u.is_registered ? 'Never' : 'Invited';
      }"""

if target_admin_table in content:
    content = content.replace(target_admin_table, replacement_admin_table, 1)
    print("2. Updated Admin table lastSeenStr with realtime presence")
else:
    print("Error: target_admin_table not found!")
    sys.exit(1)

# 3. Update signOutUser
target_signout = """  async function signOutUser() {
    if (!isDemoAuth && window.supabaseClient) {
      try {
        await window.supabaseClient.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error:', err);
      }
    }
    handleSignOutCleanup();
    showToast('Signed out successfully');
  }"""

replacement_signout = """  async function signOutUser() {
    if (typeof GlobalPresence !== 'undefined' && GlobalPresence.cleanup) {
      try { await GlobalPresence.cleanup(); } catch (e) { }
    }
    if (!isDemoAuth && window.supabaseClient) {
      try {
        await window.supabaseClient.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error:', err);
      }
    }
    handleSignOutCleanup();
    showToast('Signed out successfully');
  }"""

if target_signout in content:
    content = content.replace(target_signout, replacement_signout, 1)
    print("3. Updated signOutUser with GlobalPresence.cleanup")
else:
    print("Error: target_signout not found!")
    sys.exit(1)

# 4. Trigger GlobalPresence.init in initAuthentication and handleSuccessfulAuth
target_auth_success = """      // Initialize background Realtime chat sync immediately upon sign-in
      if (window.TeamChat && typeof window.TeamChat.initRealtime === 'function') {
        try {
          window.TeamChat.initRealtime();
        } catch (chatErr) {
          console.warn('[TeamChat] Background realtime sync startup note:', chatErr);
        }
      }"""

replacement_auth_success = """      // Initialize global realtime presence and chat sync immediately upon sign-in
      if (typeof GlobalPresence !== 'undefined' && GlobalPresence.init) {
        GlobalPresence.init();
      }
      if (window.TeamChat && typeof window.TeamChat.initRealtime === 'function') {
        try {
          window.TeamChat.initRealtime();
        } catch (chatErr) {
          console.warn('[TeamChat] Background realtime sync startup note:', chatErr);
        }
      }"""

if target_auth_success in content:
    content = content.replace(target_auth_success, replacement_auth_success, 1)
    print("4. Updated handleSuccessfulAuth with GlobalPresence.init")
else:
    print("Error: target_auth_success not found!")
    sys.exit(1)

# 5. In loadRealDirectoryMembers: transform DB profiles with GlobalPresence
target_load_members = """              online: p.chat_status !== 'offline',
              lastSeen: p.last_seen ? formatTimestamp(p.last_seen) : 'Offline'"""

replacement_load_members = """              rawLastSeen: p.last_seen || null,
              chat_status: p.chat_status || null,
              online: (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline) ? GlobalPresence.isUserOnline(p) : (p.chat_status === 'online'),
              lastSeen: (typeof GlobalPresence !== 'undefined' && GlobalPresence.formatLastSeen)
                ? GlobalPresence.formatLastSeen(p.last_seen, (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline) ? GlobalPresence.isUserOnline(p) : (p.chat_status === 'online'))
                : (p.last_seen ? formatTimestamp(p.last_seen) : 'Offline')"""

if target_load_members in content:
    content = content.replace(target_load_members, replacement_load_members, 1)
    print("5. Updated loadRealDirectoryMembers presence mapping")
else:
    print("Error: target_load_members not found!")
    sys.exit(1)

# 6. In renderSidebarLists: online dot class
target_sidebar_dot = """          const initials = member ? member.avatar : conv.name.substring(0, 2).toUpperCase();
          const isOnline = member ? member.online : false;
          avatarHtml = `
          <div class="chat-conv-item-avatar">
            ${initials}
            <span class="chat-online-dot ${isOnline ? '' : 'offline'}"></span>
          </div>
        `;"""

replacement_sidebar_dot = """          const initials = member ? member.avatar : conv.name.substring(0, 2).toUpperCase();
          const isOnline = member ? ((typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline) ? GlobalPresence.isUserOnline(member) : !!member.online) : false;
          avatarHtml = `
          <div class="chat-conv-item-avatar">
            ${initials}
            <span class="chat-online-dot ${isOnline ? 'online' : 'offline'}"></span>
          </div>
        `;"""

if target_sidebar_dot in content:
    content = content.replace(target_sidebar_dot, replacement_sidebar_dot, 1)
    print("6. Updated renderSidebarLists online dot")
else:
    print("Error: target_sidebar_dot not found!")
    sys.exit(1)

# 7. In renderActiveConversationHeader: subtitle & pip
target_header_sub = """        if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          if (member) {
            subEl.textContent = member.online ? 'Active now' : (member.lastSeen || 'Offline');
          } else {
            subEl.textContent = 'Direct Message';
          }
        } else {"""

replacement_header_sub = """        if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          if (member) {
            const isOnline = (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline)
              ? GlobalPresence.isUserOnline(member)
              : !!member.online;
            subEl.textContent = isOnline ? 'Active now' : (member.lastSeen || 'Offline');
          } else {
            subEl.textContent = 'Direct Message';
          }
        } else {"""

if target_header_sub in content:
    content = content.replace(target_header_sub, replacement_header_sub, 1)
    print("7a. Updated renderActiveConversationHeader subtitle")
else:
    print("Error: target_header_sub not found!")
    sys.exit(1)

target_header_pip = """        if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          avatarEl.textContent = member ? member.avatar : conv.name.substring(0, 2).toUpperCase();
          if (pipEl) {
            pipEl.style.display = 'block';
            pipEl.className = `chat-conv-online-pip ${member && member.online ? '' : 'offline'}`;
          }
        }"""

replacement_header_pip = """        if (conv.type === 'direct') {
          const member = state.members.find(m => m.id === conv.recipientId);
          const isOnline = member ? ((typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline) ? GlobalPresence.isUserOnline(member) : !!member.online) : false;
          avatarEl.textContent = member ? member.avatar : conv.name.substring(0, 2).toUpperCase();
          if (pipEl) {
            pipEl.style.display = 'block';
            pipEl.className = `chat-conv-online-pip ${isOnline ? 'online' : 'offline'}`;
          }
        }"""

if target_header_pip in content:
    content = content.replace(target_header_pip, replacement_header_pip, 1)
    print("7b. Updated renderActiveConversationHeader pip")
else:
    print("Error: target_header_pip not found!")
    sys.exit(1)

# 8. In renderDetailsPanel: profile status & pip
target_details_status = """          document.getElementById('detailsProfileEmail').textContent = member.email;
          document.getElementById('detailsProfileStatus').textContent = member.lastSeen;
          const pip = document.getElementById('detailsProfilePip');
          if (pip) pip.className = `details-profile-pip ${member.online ? 'online' : 'offline'}`;"""

replacement_details_status = """          document.getElementById('detailsProfileEmail').textContent = member.email;
          const isOnline = (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline)
            ? GlobalPresence.isUserOnline(member)
            : !!member.online;
          const statusEl = document.getElementById('detailsProfileStatus');
          if (statusEl) {
            statusEl.textContent = isOnline ? 'Active now' : (member.lastSeen || 'Offline');
            statusEl.className = `details-profile-status ${isOnline ? 'online' : 'offline'}`;
          }
          const pip = document.getElementById('detailsProfilePip');
          if (pip) pip.className = `details-profile-pip ${isOnline ? 'online' : 'offline'}`;"""

if target_details_status in content:
    content = content.replace(target_details_status, replacement_details_status, 1)
    print("8. Updated renderDetailsPanel profile status & pip")
else:
    print("Error: target_details_status not found!")
    sys.exit(1)

# 9. In renderDetailsPanel group members list:
target_group_mem = """          sortedMembers.forEach(mem => {
            const memRole = (mem.role || '').toLowerCase();
            const memBadge = (memRole === 'admin' || memRole === 'instructor')
              ? `<span class="chat-role-badge ${memRole}" style="font-size: 9px;">${memRole === 'instructor' ? 'Full-Time' : 'Admin'}</span>`
              : '';
            const row = document.createElement('div');
            row.className = 'details-member-row';
            row.innerHTML = `
            <div class="details-member-avatar">
              ${mem.avatar}
              <span class="details-member-pip ${mem.online ? 'online' : 'offline'}"></span>
            </div>
            <div class="details-member-info">
              <div class="details-member-name">${escapeHtml(mem.name)}</div>
              <div class="details-member-lastseen">${mem.online ? 'Active now' : mem.lastSeen}</div>
            </div>
            ${memBadge}
          `;
            membersListEl.appendChild(row);
          });"""

replacement_group_mem = """          sortedMembers.forEach(mem => {
            const isMemOnline = (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline)
              ? GlobalPresence.isUserOnline(mem)
              : !!mem.online;
            const memRole = (mem.role || '').toLowerCase();
            const memBadge = (memRole === 'admin' || memRole === 'instructor')
              ? `<span class="chat-role-badge ${memRole}" style="font-size: 9px;">${memRole === 'instructor' ? 'Full-Time' : 'Admin'}</span>`
              : '';
            const row = document.createElement('div');
            row.className = 'details-member-row';
            row.innerHTML = `
            <div class="details-member-avatar">
              ${mem.avatar}
              <span class="details-member-pip ${isMemOnline ? 'online' : 'offline'}"></span>
            </div>
            <div class="details-member-info">
              <div class="details-member-name">${escapeHtml(mem.name)}</div>
              <div class="details-member-lastseen">${isMemOnline ? 'Active now' : mem.lastSeen}</div>
            </div>
            ${memBadge}
          `;
            membersListEl.appendChild(row);
          });"""

if target_group_mem in content:
    content = content.replace(target_group_mem, replacement_group_mem, 1)
    print("9. Updated renderDetailsPanel group member list")
else:
    print("Error: target_group_mem not found!")
    sys.exit(1)

# 10. Add syncPresenceState to TeamChat and return block
target_teamchat_return = """    return {
      render: renderScreen,
      initRealtime: initRealtimeSync,
      selectConversation,
      getState: () => state
    };"""

replacement_teamchat_return = """    // Synchronize presence updates immediately from GlobalPresence
    function syncPresenceState() {
      if (!state.members || state.members.length === 0) return;
      let changed = false;
      state.members.forEach(m => {
        const wasOnline = m.online;
        const nowOnline = (typeof GlobalPresence !== 'undefined' && GlobalPresence.isUserOnline)
          ? GlobalPresence.isUserOnline(m)
          : !!m.online;
        if (wasOnline !== nowOnline) {
          m.online = nowOnline;
          m.lastSeen = (typeof GlobalPresence !== 'undefined' && GlobalPresence.formatLastSeen)
            ? GlobalPresence.formatLastSeen(m.rawLastSeen, nowOnline)
            : (nowOnline ? 'Active now' : (m.lastSeen || 'Offline'));
          changed = true;
        }
      });

      if (changed) {
        renderSidebarLists();
        renderActiveConversationHeader();
        renderDetailsPanel();
      }
    }

    return {
      render: renderScreen,
      initRealtime: initRealtimeSync,
      selectConversation,
      syncPresenceState,
      getState: () => state
    };"""

if target_teamchat_return in content:
    content = content.replace(target_teamchat_return, replacement_teamchat_return, 1)
    print("10. Added syncPresenceState to TeamChat")
else:
    print("Error: target_teamchat_return not found!")
    sys.exit(1)

# 11. In renderAll and visibility change, init GlobalPresence
target_render_all = """  function renderAll() {
    initThemeController();
    initAuthentication();
    checkUrlParams();
    renderSidebar();
    switchScreen(activeScreen);
    updateUserAvatarUI();
    renderJobDescriptionsScreen();
  }"""

replacement_render_all = """  function renderAll() {
    initThemeController();
    initAuthentication();
    checkUrlParams();
    renderSidebar();
    switchScreen(activeScreen);
    updateUserAvatarUI();
    renderJobDescriptionsScreen();
    if (typeof GlobalPresence !== 'undefined' && GlobalPresence.init) {
      GlobalPresence.init();
    }
  }

  // Re-sync presence and heartbeat whenever user returns to window tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && typeof GlobalPresence !== 'undefined' && GlobalPresence.init) {
      GlobalPresence.init();
      GlobalPresence.sendHeartbeat('online');
    }
  });"""

if target_render_all in content:
    content = content.replace(target_render_all, replacement_render_all, 1)
    print("11. Updated renderAll and added visibilitychange listener")
else:
    print("Error: target_render_all not found!")
    sys.exit(1)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: app.js fully patched with real-time presence system!")

