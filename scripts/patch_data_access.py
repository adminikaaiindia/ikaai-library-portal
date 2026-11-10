with open('data.js', encoding='utf-8') as f:
    data_txt = f.read()

# 1. Update assignInitialProgramme
assign_target = """    async assignInitialProgramme(programmeId) {
      const client = getClient();
      if (isLive()) {
        const user = await window.SupabaseClient.getUser();
        if (user) {
          const { error } = await client
            .from('profiles')
            .update({ programme_id: programmeId })
            .eq('id', user.id);
          if (error) throw error;
        }
      }
      return true;
    },"""

assign_replacement = """    async assignInitialProgramme(programmeId) {
      // Deprecated & Blocked: Programme assignments are exclusively managed by administrators
      console.warn('[DataLayer] User self-assignment of programmes is strictly disabled.');
      return false;
    },"""

if assign_target in data_txt:
    data_txt = data_txt.replace(assign_target, assign_replacement)
    print("Replaced assignInitialProgramme in data.js")
else:
    print("WARNING: assign_target not found in data.js")

# 2. Update Section 9 (Admin Functions)
admin_target = """    // 9. ADMIN FUNCTIONS
    // ------------------------------------------------------------------------
    async adminGetUsers(searchQuery = '') {
      const client = getClient();
      if (!isLive()) return [];

      try {
        let query = client
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false });

        if (searchQuery.trim()) {
          query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('[DataLayer] adminGetUsers query note:', err);
      }

      // Fallback demo/staff cohort members
      return [
        { id: 'u_demo_1', display_name: 'Sudhir Kumar', full_name: 'Sudhir Kumar', email: 's.kumar@ikaaiindia.org', role: 'intern', programme_id: '10000000-0000-0000-0000-000000000001' },
        { id: 'u_demo_2', display_name: 'Devashish Chauhan', full_name: 'Devashish Chauhan', email: 'devashish@ikaaiindia.in', role: 'instructor', programme_id: '10000000-0000-0000-0000-000000000001' },
        { id: 'u_demo_3', display_name: 'Neha Singhal', full_name: 'Neha Singhal', email: 'neha@ikaaiindia.in', role: 'instructor', programme_id: '10000000-0000-0000-0000-000000000001' },
        { id: 'u_demo_4', display_name: 'Gehna Sahni', full_name: 'Gehna Sahni', email: 'gehna@ikaaiindia.in', role: 'instructor', programme_id: '10000000-0000-0000-0000-000000000001' }
      ];
    },

    async adminUpdateUser(userId, { role, programmeId }) {
      const client = getClient();
      if (!isLive()) return false;

      const updates = {};
      if (role !== undefined) updates.role = role;
      if (programmeId !== undefined) updates.programme_id = programmeId;

      const { data, error } = await client
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select();

      if (error) throw error;
      return data;
    },"""

admin_replacement = """    // 9. ADMIN FUNCTIONS (USERS & ACCESS INVITATIONS)
    // ------------------------------------------------------------------------
    async adminListAccessInvites() {
      const client = getClient();
      if (isLive() && client) {
        try {
          const { data, error } = await client.rpc('list_access_invites');
          if (!error && Array.isArray(data)) return data;
          if (error) console.warn('[DataLayer] list_access_invites rpc note:', error);
        } catch (e) {
          console.warn('[DataLayer] list_access_invites error:', e);
        }

        // Direct table fallback if RPC is pending
        try {
          const { data: invites } = await client
            .from('access_invites')
            .select('*, programmes:programme_id(id, name, slug)')
            .order('created_at', { ascending: false });

          const { data: profiles } = await client
            .from('profiles')
            .select('*, programmes:programme_id(id, name, slug)')
            .order('created_at', { ascending: false });

          if (invites || profiles) {
            const combined = [];
            const seenEmails = new Set();

            (invites || []).forEach(inv => {
              seenEmails.add(inv.email.toLowerCase());
              const matchProfile = (profiles || []).find(p => p.email && p.email.toLowerCase() === inv.email.toLowerCase());
              combined.push({
                invite_id: inv.id,
                email: inv.email,
                role: inv.role,
                programme_id: inv.programme_id,
                programme_name: inv.programmes?.name || (inv.role === 'admin' ? 'All Programmes' : 'Unassigned'),
                status: matchProfile?.access_status || inv.status,
                created_at: inv.created_at,
                activated_at: inv.activated_at,
                profile_id: matchProfile?.id || null,
                profile_name: matchProfile?.full_name || matchProfile?.display_name || null,
                last_seen: matchProfile?.last_seen || null,
                is_pending_approval: false
              });
            });

            (profiles || []).forEach(p => {
              if (p.email && !seenEmails.has(p.email.toLowerCase())) {
                combined.push({
                  invite_id: null,
                  email: p.email,
                  role: p.role,
                  programme_id: p.programme_id,
                  programme_name: p.programmes?.name || (p.role === 'admin' ? 'All Programmes' : 'Unassigned'),
                  status: p.access_status || 'pending',
                  created_at: p.created_at,
                  activated_at: null,
                  profile_id: p.id,
                  profile_name: p.full_name || p.display_name || null,
                  last_seen: p.last_seen || null,
                  is_pending_approval: (p.access_status === 'pending')
                });
              }
            });

            return combined;
          }
        } catch (fbErr) {
          console.warn('[DataLayer] admin list fallback error:', fbErr);
        }
      }
      return [];
    },

    async adminInviteUser({ email, role, programmeId }) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanRole = (role || '').trim().toLowerCase();
      const cleanProg = cleanRole === 'admin' ? null : (programmeId || null);

      const { data, error } = await client.rpc('invite_user', {
        p_email: cleanEmail,
        p_role: cleanRole,
        p_programme_id: cleanProg
      });

      if (error) throw error;
      return data;
    },

    async adminUpdateUserAccess(userId, { role, programmeId }) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const cleanRole = (role || '').trim().toLowerCase();
      const cleanProg = cleanRole === 'admin' ? null : (programmeId || null);

      const { data, error } = await client.rpc('update_user_access', {
        p_user_id: userId,
        p_role: cleanRole,
        p_programme_id: cleanProg
      });

      if (error) throw error;
      return data;
    },

    async adminRevokeUserAccess(userId) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const { data, error } = await client.rpc('revoke_user_access', {
        p_user_id: userId
      });

      if (error) throw error;
      return data;
    },

    async adminRestoreUserAccess(userId) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const { data, error } = await client.rpc('restore_user_access', {
        p_user_id: userId
      });

      if (error) throw error;
      return data;
    },

    // Legacy method mapped to adminUpdateUserAccess for backwards compatibility
    async adminUpdateUser(userId, { role, programmeId }) {
      return await this.adminUpdateUserAccess(userId, { role, programmeId });
    },

    async adminGetUsers(searchQuery = '') {
      const list = await this.adminListAccessInvites();
      if (!searchQuery) return list;
      const q = searchQuery.toLowerCase();
      return list.filter(u => 
        (u.email && u.email.toLowerCase().includes(q)) || 
        (u.profile_name && u.profile_name.toLowerCase().includes(q))
      );
    },"""

if admin_target in data_txt:
    data_txt = data_txt.replace(admin_target, admin_replacement)
    print("Replaced admin functions in data.js")
else:
    print("WARNING: admin_target not found in data.js")

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(data_txt)
print("Updated data.js successfully.")

