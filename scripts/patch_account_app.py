import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

print("--- PATCHING APP.JS FOR ACCOUNT SETTINGS ---")

# 1. Update element references in el
el_target = """    // Account Settings
    profileEmail: document.getElementById('profileEmail'),
    profileRole: document.getElementById('profileRole'),
    profileBranch: document.getElementById('profileBranch'),
    profilePosition: document.getElementById('profilePosition'),
    profileMemberSince: document.getElementById('profileMemberSince'),
    profileActionsForm: document.getElementById('profileActionsForm'),
    userNameInput: document.getElementById('userNameInput'),"""

el_replacement = """    // Account Settings
    profileEmail: document.getElementById('profileEmail'),
    profileSignInMethod: document.getElementById('profileSignInMethod'),
    profileRole: document.getElementById('profileRole'),
    profileProgramme: document.getElementById('profileProgramme'),
    profileBranch: document.getElementById('profileBranch'),
    profilePosition: document.getElementById('profilePosition'),
    profileMemberSince: document.getElementById('profileMemberSince'),
    profileVerifiedBadge: document.getElementById('profileVerifiedBadge'),
    settingsAvatarPreview: document.getElementById('settingsAvatarPreview'),
    avatarFileInput: document.getElementById('avatarFileInput'),
    uploadAvatarBtn: document.getElementById('uploadAvatarBtn'),
    removeAvatarBtn: document.getElementById('removeAvatarBtn'),
    avatarFeedback: document.getElementById('avatarFeedback'),
    profileActionsForm: document.getElementById('profileActionsForm'),
    userNameInput: document.getElementById('userNameInput'),
    userPhoneInput: document.getElementById('userPhoneInput'),
    profileDetailsFeedback: document.getElementById('profileDetailsFeedback'),
    saveProfileBtn: document.getElementById('saveProfileBtn'),
    googleUserNotice: document.getElementById('googleUserNotice'),
    emailUserPasswordWrap: document.getElementById('emailUserPasswordWrap'),
    passwordChangeForm: document.getElementById('passwordChangeForm'),
    newPasswordInput: document.getElementById('newPasswordInput'),
    confirmPasswordInput: document.getElementById('confirmPasswordInput'),
    changePasswordBtn: document.getElementById('changePasswordBtn'),
    passwordFeedback: document.getElementById('passwordFeedback'),
    accountSignOutBtn: document.getElementById('accountSignOutBtn'),
    accountSignOutAllBtn: document.getElementById('accountSignOutAllBtn'),
    sessionFeedback: document.getElementById('sessionFeedback'),"""

if el_target in app:
    app = app.replace(el_target, el_replacement)
    print("Updated el references in app.js")
else:
    print("WARNING: el_target not found in app.js")

# 2. Update renderAccountSettingsScreen, updateUserAvatarUI, and wireAccountSettingsEvents
render_target = """  function renderAccountSettingsScreen() {
    const p = state.profile;
    el.profileEmail.textContent = p.email;
    el.profileRole.textContent = p.role;
    el.profileBranch.textContent = p.branch;
    el.profilePosition.textContent = p.position;
    el.profileMemberSince.textContent = p.memberSince;
    el.userNameInput.value = p.name;

    if (el.settingsUserNameDisplay) el.settingsUserNameDisplay.textContent = p.name;
    if (el.settingsUserEmailDisplay) el.settingsUserEmailDisplay.textContent = p.email;

    updateUserAvatarUI();
  }

  function updateUserAvatarUI() {
    const p = state.profile;
    const initials = p.initials || 'SK';
    if (el.userAvatarInitials) el.userAvatarInitials.textContent = initials;
    if (el.topBarUserName) el.topBarUserName.textContent = p.name;
    if (el.dropdownUserName) el.dropdownUserName.textContent = p.name;
    if (el.dropdownUserEmail) el.dropdownUserEmail.textContent = p.email;
    if (el.profileFullNameDisplay) el.profileFullNameDisplay.textContent = p.name;
    if (el.profileEmail) el.profileEmail.textContent = p.email;
  }

  if (el.profileActionsForm && el.userNameInput) {
    el.profileActionsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newName = el.userNameInput.value.trim();
      if (!newName) {
        alert('Name cannot be empty.');
        return;
      }

      if (window.DataLayer) {
        try {
          await window.DataLayer.updateProfile({ fullName: newName });
        } catch (err) {
          console.warn('[DataLayer] updateProfile note:', err);
        }
      }

      state.profile.name = newName;
      const parts = newName.split(' ');
      let inits = '';
      if (parts.length >= 2) {
        inits = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      } else {
        inits = newName.substring(0, 2).toUpperCase();
      }
      state.profile.initials = inits;
      saveState();
      updateUserAvatarUI();
      showToast(`Profile name updated to ${newName}`);
    });
  }"""

render_replacement = """  // =========================================================================
  // ACCOUNT SETTINGS CONTROLLER (REAL DATABASE CONNECTION & AVATAR STORAGE)
  // =========================================================================
  async function renderAccountSettingsScreen() {
    let liveUser = null;
    let liveProfile = null;

    if (window.SupabaseClient) {
      try {
        liveUser = await window.SupabaseClient.getUser();
        if (liveUser && window.DataLayer) {
          liveProfile = await window.DataLayer.getProfile(liveUser.id);
        }
      } catch (err) {
        console.warn('[AccountSettings] Error fetching live profile:', err);
      }
    }

    // Determine values: DB profile -> Auth user -> Local state
    const p = state.profile || {};
    const fullName = liveProfile?.full_name || liveProfile?.display_name || liveUser?.user_metadata?.full_name || p.name || 'User';
    const email = liveUser?.email || liveProfile?.email || p.email || '--';
    const roleKey = (liveProfile?.role || p.role || 'learner').toLowerCase();
    const roleFormatted = roleKey === 'admin' ? 'Administrator' : (roleKey === 'instructor' ? 'Instructor' : 'Intern / Learner');
    const programmeName = liveProfile?.programme?.name || p.programmeName || 'Unassigned';
    const branch = liveProfile?.branch || p.branch || 'Ikaai HQ - New Delhi / Remote';
    const position = liveProfile?.position || p.position || 'Not specified';
    const phone = liveProfile?.phone || p.phone || '';
    const avatarUrl = liveProfile?.avatar_url || liveUser?.user_metadata?.avatar_url || liveUser?.user_metadata?.picture || p.avatar_url || null;

    // Format Member Since
    let memberSinceFormatted = p.memberSince || 'November 2026';
    const rawDate = liveProfile?.member_since_date || liveProfile?.created_at || liveUser?.created_at;
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          memberSinceFormatted = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
      } catch (de) {
        // fallback to default
      }
    }

    // Determine Sign-in Method & Verified Status
    const isGoogle = Boolean(
      liveUser?.app_metadata?.provider === 'google' ||
      liveUser?.identities?.some(i => i.provider === 'google')
    );
    const signInMethodText = isGoogle ? 'Google Account' : 'Email & Password';
    const isVerified = isGoogle || Boolean(liveUser?.email_confirmed_at || liveUser?.confirmed_at || p.verified);

    // Update state cache for cross-app synchronization
    state.profile.name = fullName;
    state.profile.email = email;
    state.profile.role = roleKey;
    state.profile.branch = branch;
    state.profile.position = position;
    state.profile.phone = phone;
    state.profile.memberSince = memberSinceFormatted;
    state.profile.avatar_url = avatarUrl;
    state.profile.verified = isVerified;

    // Compute initials
    const nameParts = fullName.trim().split(/\\s+/);
    state.profile.initials = (nameParts.length >= 2 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]) : fullName.slice(0, 2)).toUpperCase();

    // Populate Account Info Card
    if (el.profileEmail) el.profileEmail.textContent = email;
    if (el.profileSignInMethod) el.profileSignInMethod.textContent = signInMethodText;
    if (el.profileRole) el.profileRole.textContent = roleFormatted;
    if (el.profileProgramme) el.profileProgramme.textContent = programmeName;
    if (el.profileBranch) el.profileBranch.textContent = branch;
    if (el.profilePosition) el.profilePosition.textContent = position;
    if (el.profileMemberSince) el.profileMemberSince.textContent = memberSinceFormatted;

    // Verification Badge
    if (el.profileVerifiedBadge) {
      if (isVerified) {
        el.profileVerifiedBadge.className = 'status-verified-badge';
        el.profileVerifiedBadge.textContent = isGoogle ? '✓ Verified (Google)' : '✓ Verified Email';
      } else {
        el.profileVerifiedBadge.className = 'status-unverified-badge';
        el.profileVerifiedBadge.textContent = '⚠️ Unverified Email';
      }
    }

    // Populate Avatar Preview
    if (el.settingsAvatarPreview) {
      if (avatarUrl) {
        el.settingsAvatarPreview.innerHTML = `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(fullName)}">`;
        el.settingsAvatarPreview.style.background = 'transparent';
      } else {
        el.settingsAvatarPreview.textContent = state.profile.initials;
        el.settingsAvatarPreview.style.background = 'linear-gradient(135deg, #00a544, #00511e)';
      }
    }
    if (el.removeAvatarBtn) {
      el.removeAvatarBtn.style.display = liveProfile?.avatar_url ? 'inline-flex' : 'none';
    }

    // Populate Form Inputs
    if (el.userNameInput) el.userNameInput.value = fullName;
    if (el.userPhoneInput) el.userPhoneInput.value = phone;

    // Toggle Google notice vs Email password form
    if (el.googleUserNotice && el.emailUserPasswordWrap) {
      if (isGoogle) {
        el.googleUserNotice.style.display = 'flex';
        el.emailUserPasswordWrap.style.display = 'none';
      } else {
        el.googleUserNotice.style.display = 'none';
        el.emailUserPasswordWrap.style.display = 'block';
      }
    }

    // Refresh top bar and dropdowns
    updateUserAvatarUI();
  }

  function updateUserAvatarUI() {
    const p = state.profile || {};
    const initials = p.initials || 'SK';
    const displayName = p.name || 'User';
    const email = p.email || '--';

    if (el.userAvatarInitials) {
      if (p.avatar_url) {
        el.userAvatarInitials.innerHTML = `<img src="${escapeHtml(p.avatar_url)}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        el.userAvatarInitials.style.background = 'transparent';
      } else {
        el.userAvatarInitials.textContent = initials;
        el.userAvatarInitials.style.background = 'linear-gradient(135deg, #00a544, #00511e)';
      }
    }
    if (el.topBarUserName) el.topBarUserName.textContent = displayName;
    if (el.dropdownUserName) el.dropdownUserName.textContent = displayName;
    if (el.dropdownUserEmail) el.dropdownUserEmail.textContent = email;
    if (el.profileFullNameDisplay) el.profileFullNameDisplay.textContent = displayName;
    if (el.profileEmail) el.profileEmail.textContent = email;
  }

  // Feedback display helper for Account Settings
  function showAccountBanner(containerEl, message, type = 'success') {
    if (!containerEl) return;
    containerEl.className = `account-feedback-banner ${type}`;
    containerEl.style.display = 'flex';
    containerEl.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        ${type === 'success' 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    setTimeout(() => {
      if (containerEl && type === 'success') {
        containerEl.style.display = 'none';
      }
    }, 4500);
  }

  // Wire all events for Account Settings
  let accountSettingsEventsWired = false;
  function wireAccountSettingsEvents() {
    if (accountSettingsEventsWired) return;
    accountSettingsEventsWired = true;

    // 1. Edit Profile Details (Full Name and Phone)
    if (el.profileActionsForm) {
      el.profileActionsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = el.userNameInput ? el.userNameInput.value.trim() : '';
        const newPhone = el.userPhoneInput ? el.userPhoneInput.value.trim() : '';

        if (!newName || newName.length < 2 || newName.length > 60) {
          showAccountBanner(el.profileDetailsFeedback, 'Full name must be between 2 and 60 characters.', 'error');
          return;
        }

        if (newPhone && !/^\\+?[\\d\\s\\-()]{7,20}$/.test(newPhone)) {
          showAccountBanner(el.profileDetailsFeedback, 'Please enter a valid phone number (e.g. +91 98765 43210).', 'error');
          return;
        }

        if (el.saveProfileBtn) {
          el.saveProfileBtn.disabled = true;
          el.saveProfileBtn.textContent = 'Saving...';
        }

        try {
          if (window.DataLayer) {
            await window.DataLayer.updateProfile({
              fullName: newName,
              phone: newPhone || null
            });
          }

          state.profile.name = newName;
          state.profile.phone = newPhone;
          const parts = newName.split(/\\s+/);
          state.profile.initials = (parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]) : newName.slice(0, 2)).toUpperCase();
          updateUserAvatarUI();

          showAccountBanner(el.profileDetailsFeedback, '✓ Profile details saved successfully.', 'success');
          showToast(`Profile updated: ${newName}`);
        } catch (err) {
          showAccountBanner(el.profileDetailsFeedback, `Save failed: ${err.message}`, 'error');
        } finally {
          if (el.saveProfileBtn) {
            el.saveProfileBtn.disabled = false;
            el.saveProfileBtn.textContent = 'Save Changes';
          }
        }
      });
    }

    // 2. Avatar Upload Button & File Input
    if (el.uploadAvatarBtn && el.avatarFileInput) {
      el.uploadAvatarBtn.addEventListener('click', () => {
        el.avatarFileInput.click();
      });

      el.avatarFileInput.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
          showAccountBanner(el.avatarFeedback, 'Selected image exceeds the 2 MB limit.', 'error');
          el.avatarFileInput.value = '';
          return;
        }

        const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedMimes.includes(file.type.toLowerCase())) {
          showAccountBanner(el.avatarFeedback, 'Only PNG, JPG, and WebP image formats are allowed.', 'error');
          el.avatarFileInput.value = '';
          return;
        }

        el.uploadAvatarBtn.disabled = true;
        el.uploadAvatarBtn.textContent = 'Uploading...';

        try {
          if (!window.DataLayer) throw new Error('Data connection unavailable.');
          const newUrl = await window.DataLayer.uploadAvatar(file);
          state.profile.avatar_url = newUrl;
          updateUserAvatarUI();
          await renderAccountSettingsScreen();
          showAccountBanner(el.avatarFeedback, '✓ Profile photo uploaded and updated successfully.', 'success');
          showToast('Profile photo updated.');
        } catch (err) {
          showAccountBanner(el.avatarFeedback, `Upload failed: ${err.message}`, 'error');
        } finally {
          el.uploadAvatarBtn.disabled = false;
          el.uploadAvatarBtn.textContent = 'Upload Photo';
          el.avatarFileInput.value = '';
        }
      });
    }

    // 3. Avatar Remove Button
    if (el.removeAvatarBtn) {
      el.removeAvatarBtn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to remove your profile photo?')) return;

        el.removeAvatarBtn.disabled = true;
        try {
          if (!window.DataLayer) throw new Error('Data connection unavailable.');
          await window.DataLayer.removeAvatar();
          state.profile.avatar_url = null;
          updateUserAvatarUI();
          await renderAccountSettingsScreen();
          showAccountBanner(el.avatarFeedback, '✓ Profile photo removed.', 'success');
          showToast('Profile photo removed.');
        } catch (err) {
          showAccountBanner(el.avatarFeedback, `Remove failed: ${err.message}`, 'error');
        } finally {
          el.removeAvatarBtn.disabled = false;
        }
      });
    }

    // 4. Password Change Form (Email-and-password users only)
    if (el.passwordChangeForm) {
      el.passwordChangeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPass = el.newPasswordInput ? el.newPasswordInput.value : '';
        const confirmPass = el.confirmPasswordInput ? el.confirmPasswordInput.value : '';

        if (!newPass || newPass.length < 8) {
          showAccountBanner(el.passwordFeedback, 'New password must be at least 8 characters long.', 'error');
          return;
        }

        if (newPass !== confirmPass) {
          showAccountBanner(el.passwordFeedback, 'Passwords do not match. Please re-enter.', 'error');
          return;
        }

        if (el.changePasswordBtn) {
          el.changePasswordBtn.disabled = true;
          el.changePasswordBtn.textContent = 'Updating...';
        }

        try {
          if (!window.DataLayer) throw new Error('Data connection unavailable.');
          await window.DataLayer.changePassword(newPass);
          if (el.newPasswordInput) el.newPasswordInput.value = '';
          if (el.confirmPasswordInput) el.confirmPasswordInput.value = '';
          showAccountBanner(el.passwordFeedback, '✓ Password updated successfully.', 'success');
          showToast('Password updated.');
        } catch (err) {
          showAccountBanner(el.passwordFeedback, `Password update failed: ${err.message}`, 'error');
        } finally {
          if (el.changePasswordBtn) {
            el.changePasswordBtn.disabled = false;
            el.changePasswordBtn.textContent = 'Update Password';
          }
        }
      });
    }

    // 5. Sign Out
    if (el.accountSignOutBtn) {
      el.accountSignOutBtn.addEventListener('click', async () => {
        if (el.accountSignOutBtn) el.accountSignOutBtn.disabled = true;
        try {
          if (window.DataLayer) await window.DataLayer.signOut();
        } catch (e) {
          console.warn('[AccountSettings] Sign out error:', e);
        }
        handleSignOutCleanup();
        window.location.reload();
      });
    }

    // 6. Sign Out of All Devices
    if (el.accountSignOutAllBtn) {
      el.accountSignOutAllBtn.addEventListener('click', async () => {
        if (!confirm('Are you sure you want to sign out of all active sessions across all devices?')) return;
        if (el.accountSignOutAllBtn) el.accountSignOutAllBtn.disabled = true;
        try {
          if (window.DataLayer) await window.DataLayer.signOutAllDevices();
        } catch (e) {
          console.warn('[AccountSettings] Sign out all error:', e);
        }
        handleSignOutCleanup();
        window.location.reload();
      });
    }
  }"""

if render_target in app:
    app = app.replace(render_target, render_replacement)
    print("Replaced renderAccountSettingsScreen and added wireAccountSettingsEvents in app.js")
else:
    print("WARNING: render_target not found in app.js")

# 3. Call wireAccountSettingsEvents in switchScreen('settings') or renderAll
switch_target = """    } else if (screenKey === 'settings') {
      renderAccountSettingsScreen();"""

switch_replacement = """    } else if (screenKey === 'settings') {
      wireAccountSettingsEvents();
      renderAccountSettingsScreen();"""

if switch_target in app:
    app = app.replace(switch_target, switch_replacement)
    print("Updated switchScreen('settings') to wire events and render")
else:
    print("WARNING: switch_target not found in app.js")

# 4. Remove duplicate listener at end of app.js
dup_listener = """  // Save profile name
  if (el.profileActionsForm) {
    el.profileActionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = el.userNameInput.value.trim();
      if (!newName) {
        alert('Name cannot be empty.');
        return;
      }
      state.profile.name = newName;
      const parts = newName.split(/\\s+/);
      let inits = '';
      if (parts.length >= 2) {
        inits = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      } else {
        inits = newName.substring(0, 2).toUpperCase();
      }
      state.profile.initials = inits;
      saveState();
      updateUserAvatarUI();
      showToast(`Profile name updated to ${newName}`);
    });
  }"""

if dup_listener in app:
    app = app.replace(dup_listener, "// Duplicate profileActionsForm listener removed; handled in AccountSettingsController")
    print("Removed duplicate profileActionsForm listener in app.js")
else:
    print("WARNING: dup_listener not found in app.js")

# 5. Enhance handleSuccessfulAuth to populate full profile fields
auth_target = """        const profile = await window.DataLayer.getProfile(userData.id);
        if (profile) {
          state.profile.role = profile.role || 'Intern';
          applyRolePermissions(profile);
          checkFirstTimeProgrammeAssignment(profile);
        }"""

auth_replacement = """        const profile = await window.DataLayer.getProfile(userData.id);
        if (profile) {
          state.profile.role = profile.role || 'Intern';
          state.profile.name = profile.full_name || profile.display_name || state.profile.name;
          state.profile.branch = profile.branch || state.profile.branch;
          state.profile.position = profile.position || state.profile.position;
          state.profile.phone = profile.phone || state.profile.phone;
          state.profile.avatar_url = profile.avatar_url || state.profile.avatar_url;
          if (profile.programme) state.profile.programmeName = profile.programme.name;
          applyRolePermissions(profile);
          checkFirstTimeProgrammeAssignment(profile);
        }"""

if auth_target in app:
    app = app.replace(auth_target, auth_replacement)
    print("Enhanced handleSuccessfulAuth in app.js")
else:
    print("WARNING: auth_target not found in app.js")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
print("Updated app.js successfully.")

