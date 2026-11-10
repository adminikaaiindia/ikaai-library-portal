with open('data.js', encoding='utf-8') as f:
    data_content = f.read()

target = """    // 8. PROFILE & ACCOUNT SETTINGS
    // ------------------------------------------------------------------------
    async getProfile(userId) {
      const client = getClient();
      if (isLive()) {
        try {
          const uid = userId || (await window.SupabaseClient.getUser())?.id;
          if (uid) {
            const { data, error } = await client
              .from('profiles')
              .select('*')
              .eq('id', uid)
              .maybeSingle();
            if (!error && data) return data;
          }
        } catch (e) {
          console.warn('[DataLayer] Error loading profile:', e);
        }
      }
      return null;
    },

    async updateProfile({ fullName, avatarUrl }) {
      const client = getClient();
      if (isLive()) {
        const user = await window.SupabaseClient.getUser();
        if (!user) throw new Error('Authentication required.');

        const updates = { updated_at: new Date().toISOString() };
        if (fullName !== undefined) {
          updates.full_name = fullName;
          // Deprecated: display_name is mirrored for backward compatibility only
          updates.display_name = fullName;
        }
        if (avatarUrl !== undefined) updates.avatar_url = avatarUrl;

        const { data, error } = await client
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
      return { success: true };
    },"""

replacement = """    // 8. PROFILE & ACCOUNT SETTINGS
    // ------------------------------------------------------------------------
    async getProfile(userId) {
      const client = getClient();
      if (isLive()) {
        try {
          const uid = userId || (await window.SupabaseClient.getUser())?.id;
          if (uid) {
            const { data, error } = await client
              .from('profiles')
              .select('*')
              .eq('id', uid)
              .maybeSingle();

            if (!error && data) {
              // Resolve programme details if programme_id exists
              if (data.programme_id) {
                try {
                  const prog = await DataLayer.getProgramme(data.programme_id);
                  if (prog) data.programme = prog;
                } catch (pe) {
                  console.warn('[DataLayer] Error fetching programme for profile:', pe);
                }
              }
              return data;
            }
          }
        } catch (e) {
          console.warn('[DataLayer] Error loading profile:', e);
        }
      }
      return null;
    },

    async updateProfile({ fullName, phone, avatarUrl }) {
      const client = getClient();
      if (isLive()) {
        const user = await window.SupabaseClient.getUser();
        if (!user) throw new Error('Authentication required.');

        const updates = { updated_at: new Date().toISOString() };
        if (fullName !== undefined) {
          const trimmed = fullName.trim();
          if (trimmed.length < 2 || trimmed.length > 60) {
            throw new Error('Name must be between 2 and 60 characters.');
          }
          updates.full_name = trimmed;
          // Deprecated: display_name is mirrored for backward compatibility only
          updates.display_name = trimmed;
        }

        if (phone !== undefined) {
          const trimmedPhone = phone ? phone.trim() : null;
          if (trimmedPhone && !/^\\+?[\\d\\s\\-()]{7,20}$/.test(trimmedPhone)) {
            throw new Error('Please enter a valid phone number (e.g. +91 98765 43210).');
          }
          updates.phone = trimmedPhone || null;
        }

        if (avatarUrl !== undefined) {
          updates.avatar_url = avatarUrl;
        }

        const { data, error } = await client
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;

        // Resolve programme details if programme_id exists
        if (data && data.programme_id) {
          try {
            data.programme = await DataLayer.getProgramme(data.programme_id);
          } catch (pe) {
            // silent fallback
          }
        }
        return data;
      }
      return { success: true };
    },

    async uploadAvatar(file) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const user = await window.SupabaseClient.getUser();
      if (!user) throw new Error('Authentication required.');

      // Validation
      if (!file) throw new Error('No file selected.');
      const maxBytes = 2 * 1024 * 1024; // 2 MB limit
      if (file.size > maxBytes) {
        throw new Error('File exceeds maximum size limit of 2 MB.');
      }

      const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedMimes.includes(file.type.toLowerCase())) {
        throw new Error('Only PNG, JPG, JPEG, and WebP image formats are allowed.');
      }

      const fileExt = file.name.split('.').pop().toLowerCase();
      const storagePath = `${user.id}/avatar_${Date.now()}.${fileExt}`;

      // Clean up any old avatar files in user's folder
      try {
        const { data: existingFiles } = await client.storage.from('avatars').list(user.id);
        if (existingFiles && existingFiles.length > 0) {
          const filesToRemove = existingFiles.map(f => `${user.id}/${f.name}`);
          await client.storage.from('avatars').remove(filesToRemove);
        }
      } catch (cleanErr) {
        console.warn('[DataLayer] Could not remove old avatar files:', cleanErr);
      }

      // Upload new avatar file
      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw new Error(`Avatar upload failed: ${uploadError.message}`);
      }

      // Retrieve public URL
      const { data: pubData } = client.storage.from('avatars').getPublicUrl(storagePath);
      const publicUrl = pubData?.publicUrl;

      // Update profiles.avatar_url
      await DataLayer.updateProfile({ avatarUrl: publicUrl });

      return publicUrl;
    },

    async removeAvatar() {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const user = await window.SupabaseClient.getUser();
      if (!user) throw new Error('Authentication required.');

      // Remove existing files in user's folder
      try {
        const { data: existingFiles } = await client.storage.from('avatars').list(user.id);
        if (existingFiles && existingFiles.length > 0) {
          const filesToRemove = existingFiles.map(f => `${user.id}/${f.name}`);
          await client.storage.from('avatars').remove(filesToRemove);
        }
      } catch (cleanErr) {
        console.warn('[DataLayer] Could not remove avatar files from storage:', cleanErr);
      }

      // Set profiles.avatar_url = null
      await DataLayer.updateProfile({ avatarUrl: null });
      return true;
    },

    async changePassword(newPassword) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      if (!newPassword || newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }

      const { data, error } = await client.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return data;
    },

    async signOut() {
      const client = getClient();
      if (isLive() && client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn('[DataLayer] Sign out error:', e);
        }
      }
      return true;
    },

    async signOutAllDevices() {
      const client = getClient();
      if (isLive() && client) {
        try {
          await client.auth.signOut({ scope: 'global' });
        } catch (e) {
          console.warn('[DataLayer] Global sign out error:', e);
        }
      }
      return true;
    },"""

if target in data_content:
    new_data = data_content.replace(target, replacement)
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(new_data)
    print("SUCCESS: Patched Section 8 in data.js")
else:
    print("ERROR: Target block not found in data.js")

