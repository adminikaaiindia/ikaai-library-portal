import sys

# 1. Patch index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_style = """  <style>
    html.has-portal-session #authScreen { display: none !important; }
    html.has-portal-session #appShell { display: flex !important; }
  </style>"""

replacement_style = """  <style>
    html.has-portal-session #authScreen { display: none !important; }
    html.has-portal-session #appShell { display: flex !important; }
    html:not(.has-portal-session) #authScreen { display: flex !important; }
    html:not(.has-portal-session) #appShell { display: none !important; }
  </style>"""

if target_style in html:
    html = html.replace(target_style, replacement_style, 1)
    print("1. Updated index.html style block for portal session visibility")
else:
    print("Error: target_style not found in index.html")
    sys.exit(1)

target_subtitle = '<div class="chat-conv-subtitle" id="chatActiveSubtitle">Programme-wide • 24 members</div>'
replacement_subtitle = '<div class="chat-conv-subtitle" id="chatActiveSubtitle">Programme-wide</div>'

if target_subtitle in html:
    html = html.replace(target_subtitle, replacement_subtitle, 1)
    print("2. Replaced hardcoded 24 members in index.html chatActiveSubtitle")
else:
    print("Warning: target_subtitle not found in index.html (already updated?)")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)


# 2. Patch app.js
with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

target_signout_block = """  function handleSignOutCleanup() {
    if (typeof cleanupSupportInbox === 'function') cleanupSupportInbox();
    localStorage.removeItem('ikaai_portal_session');
    if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
    if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';
    if (el.authScreen) el.authScreen.style.display = 'flex';
    if (el.appShell) el.appShell.style.display = 'none';
    if (el.userDropdownCard) el.userDropdownCard.style.display = 'none';
  }

  async function signOutUser() {
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

replacement_signout_block = """  function handleSignOutCleanup() {
    try {
      document.documentElement.classList.remove('has-portal-session');
    } catch (e) { }

    if (typeof cleanupSupportInbox === 'function') cleanupSupportInbox();

    try {
      localStorage.removeItem('ikaai_portal_session');
      // Clear Supabase session auth tokens from localStorage
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('sb-') || k === 'supabase.auth.token')) {
          try { localStorage.removeItem(k); } catch (err) { }
        }
      }
    } catch (e) { }

    if (state && state.profile) {
      state.profile.name = '';
      state.profile.email = '';
      state.profile.id = 'u-anon';
      state.profile.role = 'Intern';
      state.profile.avatar_url = null;
    }

    if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
    if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';
    if (el.userDropdownCard) el.userDropdownCard.style.display = 'none';

    // Strictly enforce hiding appShell and showing authScreen with !important
    if (el.appShell) {
      el.appShell.style.setProperty('display', 'none', 'important');
    }
    if (el.authScreen) {
      el.authScreen.style.setProperty('display', 'flex', 'important');
    }
  }

  async function signOutUser() {
    if (typeof GlobalPresence !== 'undefined' && GlobalPresence.cleanup) {
      try { await GlobalPresence.cleanup(); } catch (e) { }
    }
    if (window.DataLayer && typeof window.DataLayer.signOut === 'function') {
      try { await window.DataLayer.signOut(); } catch (e) { }
    } else if (!isDemoAuth && window.supabaseClient) {
      try {
        await window.supabaseClient.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error:', err);
      }
    }

    handleSignOutCleanup();
    showToast('Signed out successfully');

    // Force immediate clean reload back to login page
    setTimeout(() => {
      window.location.href = window.location.pathname;
    }, 300);
  }"""

if target_signout_block in app:
    app = app.replace(target_signout_block, replacement_signout_block, 1)
    print("3. Updated handleSignOutCleanup and signOutUser in app.js")
else:
    print("Error: target_signout_block not found in app.js")
    sys.exit(1)

# In loadRealDirectoryMembers: keep All Members conversation synced
target_all_members_sync = """          const DUMMY_CHANNELS = new Set([
            'general', '#general',
            'announcements', '#announcements',
            'random', '#random',
            'group-hr-interns',
            'channel-general', 'channel-help', 'channel-intro'
          ]);"""

replacement_all_members_sync = """          // Keep All Members conversation strictly synchronized with exact real members count
          const allMembersConv = state.conversations.find(c => c.id === 'all-members');
          if (allMembersConv) {
            allMembersConv.type = 'all_members';
            allMembersConv.name = 'All Members';
            allMembersConv.memberCount = state.members.length;
            allMembersConv.members = state.members.map(m => m.id);
          }

          const DUMMY_CHANNELS = new Set([
            'general', '#general',
            'announcements', '#announcements',
            'random', '#random',
            'group-hr-interns',
            'channel-general', 'channel-help', 'channel-intro'
          ]);"""

if target_all_members_sync in app:
    app = app.replace(target_all_members_sync, replacement_all_members_sync, 1)
    print("4. Added All Members sync in loadRealDirectoryMembers")
else:
    print("Error: target_all_members_sync not found in app.js")
    sys.exit(1)

# In dbConvs loop: prevent All Members channel from being treated as arbitrary channel
target_db_convs_check = """                if (DUMMY_CHANNELS.has(normName) || DUMMY_CHANNELS.has(normSlug) || DUMMY_CHANNELS.has(dc.id)) {
                  return;
                }"""

replacement_db_convs_check = """                if (DUMMY_CHANNELS.has(normName) || DUMMY_CHANNELS.has(normSlug) || DUMMY_CHANNELS.has(dc.id)) {
                  return;
                }
                if (normName === 'all members' || normSlug === 'all-members' || dc.id === 'all-members') {
                  if (allMembersConv) {
                    allMembersConv.type = 'all_members';
                    allMembersConv.memberCount = state.members.length;
                    allMembersConv.members = state.members.map(m => m.id);
                  }
                  return;
                }"""

if target_db_convs_check in app:
    app = app.replace(target_db_convs_check, replacement_db_convs_check, 1)
    print("5. Added check to prevent duplicate All Members channel from DB")
else:
    print("Error: target_db_convs_check not found in app.js")
    sys.exit(1)

# In renderActiveConversationHeader: dynamic realMemberCount without fallback to 24
target_header_count = """        } else {
          subEl.textContent = `${conv.type === 'all_members' ? 'Programme-wide' : 'Channel'} • ${conv.memberCount || conv.members?.length || 24} members`;
        }"""

replacement_header_count = """        } else {
          const isAllMembers = conv.id === 'all-members' || conv.type === 'all_members' || (conv.name && conv.name.toLowerCase() === 'all members');
          const realMemberCount = isAllMembers
            ? (state.members && state.members.length > 0 ? state.members.length : 10)
            : (conv.memberCount || (conv.members && conv.members.length > 0 ? conv.members.length : state.members.length) || 1);
          const channelLabel = isAllMembers ? 'Programme-wide' : (conv.type === 'group' ? 'Group' : 'Channel');
          subEl.textContent = `${channelLabel} • ${realMemberCount} member${realMemberCount === 1 ? '' : 's'}`;
        }"""

if target_header_count in app:
    app = app.replace(target_header_count, replacement_header_count, 1)
    print("6. Updated renderActiveConversationHeader realMemberCount calculation")
else:
    print("Error: target_header_count not found in app.js")
    sys.exit(1)

# In renderActiveConversationHeader avatar:
target_avatar_channel = """        } else if (conv.type === 'channel') {
          avatarEl.textContent = '#';
          if (pipEl) pipEl.style.display = 'none';
        } else {
          avatarEl.textContent = '👥';
          if (pipEl) pipEl.style.display = 'none';
        }"""

replacement_avatar_channel = """        } else if (conv.id === 'all-members' || conv.type === 'all_members' || (conv.name && conv.name.toLowerCase() === 'all members')) {
          avatarEl.textContent = '👥';
          if (pipEl) pipEl.style.display = 'none';
        } else if (conv.type === 'channel') {
          avatarEl.textContent = '#';
          if (pipEl) pipEl.style.display = 'none';
        } else {
          avatarEl.textContent = '👥';
          if (pipEl) pipEl.style.display = 'none';
        }"""

if target_avatar_channel in app:
    app = app.replace(target_avatar_channel, replacement_avatar_channel, 1)
    print("7. Updated renderActiveConversationHeader avatar for All Members")
else:
    print("Error: target_avatar_channel not found in app.js")
    sys.exit(1)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("SUCCESS: All logout and member count patches applied successfully!")
