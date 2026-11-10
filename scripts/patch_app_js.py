# scripts/patch_app_js.py
with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update element references in el
target_el = """    programmeSelectModal: document.getElementById('programmeSelectModal'),
    confirmProgrammeBtn: document.getElementById('confirmProgrammeBtn'),"""

replacement_el = """    // Access Gating Screens
    accessPendingScreen: document.getElementById('accessPendingScreen'),
    pendingUserEmail: document.getElementById('pendingUserEmail'),
    pendingRefreshBtn: document.getElementById('pendingRefreshBtn'),
    pendingSignOutBtn: document.getElementById('pendingSignOutBtn'),
    accessRevokedScreen: document.getElementById('accessRevokedScreen'),
    revokedUserEmail: document.getElementById('revokedUserEmail'),
    revokedSignOutBtn: document.getElementById('revokedSignOutBtn'),

    // Admin Users & Access Elements
    adminPendingAlert: document.getElementById('adminPendingAlert'),
    adminPendingAlertTitle: document.getElementById('adminPendingAlertTitle'),
    adminPendingAlertDesc: document.getElementById('adminPendingAlertDesc'),
    adminFilterPendingBtn: document.getElementById('adminFilterPendingBtn'),
    adminTabSingleInviteBtn: document.getElementById('adminTabSingleInviteBtn'),
    adminTabBulkInviteBtn: document.getElementById('adminTabBulkInviteBtn'),
    adminSingleInviteForm: document.getElementById('adminSingleInviteForm'),
    adminInviteEmail: document.getElementById('adminInviteEmail'),
    adminInviteRole: document.getElementById('adminInviteRole'),
    adminInviteProgramme: document.getElementById('adminInviteProgramme'),
    adminInviteProgNote: document.getElementById('adminInviteProgNote'),
    adminSubmitInviteBtn: document.getElementById('adminSubmitInviteBtn'),
    adminBulkInviteSection: document.getElementById('adminBulkInviteSection'),
    adminBulkTextInput: document.getElementById('adminBulkTextInput'),
    adminBulkCsvInput: document.getElementById('adminBulkCsvInput'),
    adminBulkValidateBtn: document.getElementById('adminBulkValidateBtn'),
    adminBulkClearBtn: document.getElementById('adminBulkClearBtn'),
    adminBulkPreviewBox: document.getElementById('adminBulkPreviewBox'),
    adminBulkPreviewTbody: document.getElementById('adminBulkPreviewTbody'),
    adminBulkConfirmBtn: document.getElementById('adminBulkConfirmBtn'),
    adminUsersCountChip: document.getElementById('adminUsersCountChip'),
    adminFilterRole: document.getElementById('adminFilterRole'),
    adminFilterProg: document.getElementById('adminFilterProg'),
    adminFilterStatus: document.getElementById('adminFilterStatus'),
    adminEditUserModal: document.getElementById('adminEditUserModal'),
    adminEditUserId: document.getElementById('adminEditUserId'),
    adminEditUserName: document.getElementById('adminEditUserName'),
    adminEditUserEmail: document.getElementById('adminEditUserEmail'),
    adminEditRoleSelect: document.getElementById('adminEditRoleSelect'),
    adminEditProgSelect: document.getElementById('adminEditProgSelect'),
    adminEditProgNote: document.getElementById('adminEditProgNote'),
    adminSaveEditUserBtn: document.getElementById('adminSaveEditUserBtn'),
    adminCancelEditUserBtn: document.getElementById('adminCancelEditUserBtn'),
    closeAdminEditUserModalBtn: document.getElementById('closeAdminEditUserModalBtn'),"""

if target_el in code:
    code = code.replace(target_el, replacement_el)
    print("Replaced el references successfully.")
else:
    print("WARNING: target_el not found!")

# 2. Wire gate buttons during event registration
target_search_listeners = """  if (el.adminSearchUsersBtn) {
    el.adminSearchUsersBtn.addEventListener('click', renderAdminPortal);
  }
  if (el.adminUserSearchInput) {
    el.adminUserSearchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') renderAdminPortal();
    });
  }"""

replacement_search_listeners = """  // Admin Users & Access Event Listeners
  wireAdminPortalEvents();

  // Access Gating Screens Handlers
  if (el.pendingRefreshBtn) {
    el.pendingRefreshBtn.addEventListener('click', async () => {
      el.pendingRefreshBtn.disabled = true;
      el.pendingRefreshBtn.textContent = 'Checking...';
      try {
        const sessionUser = await window.DataLayer.getCurrentUser();
        if (sessionUser && sessionUser.id) {
          const profile = await window.DataLayer.getProfile(sessionUser.id);
          if (profile && profile.access_status === 'active') {
            showToast('Access approved! Welcome to Ikaai Academy.');
            await handleSuccessfulAuth({ id: sessionUser.id, email: sessionUser.email, name: profile.full_name });
            return;
          }
        }
        showToast('Your account is still awaiting approval.');
      } catch (err) {
        console.warn('Check access error:', err);
        showToast('Could not check access status.');
      } finally {
        el.pendingRefreshBtn.disabled = false;
        el.pendingRefreshBtn.textContent = 'Check Status';
      }
    });
  }
  if (el.pendingSignOutBtn) {
    el.pendingSignOutBtn.addEventListener('click', signOutUser);
  }
  if (el.revokedSignOutBtn) {
    el.revokedSignOutBtn.addEventListener('click', signOutUser);
  }"""

if target_search_listeners in code:
    code = code.replace(target_search_listeners, replacement_search_listeners)
    print("Replaced search listeners and wired gate buttons.")
else:
    print("WARNING: target_search_listeners not found!")

# 3. Replace old renderAdminPortal, applyRolePermissions, and checkFirstTimeProgrammeAssignment
old_admin_block_start = "  // ==========================================\n  // ADMIN PORTAL & ROLE PERMISSIONS\n  // =========================================="
old_admin_block_end = "  async function syncCurriculumFromBackend() {"

start_idx = code.find(old_admin_block_start)
end_idx = code.find(old_admin_block_end, start_idx)

if start_idx != -1 and end_idx != -1:
    new_admin_block = """  // ==========================================
  // ADMIN PORTAL & ROLE PERMISSIONS
  // ==========================================
  const CANONICAL_PROGRAMMES = [
    { id: '10000000-0000-0000-0000-000000000001', slug: 'human-resources', name: 'Human Resources' },
    { id: '10000000-0000-0000-0000-000000000002', slug: 'data-analyst', name: 'Data Analyst' },
    { id: '10000000-0000-0000-0000-000000000003', slug: 'social-research-policy', name: 'Social Research & Policy' },
    { id: '10000000-0000-0000-0000-000000000004', slug: 'design-social-media', name: 'Design & Social Media' },
    { id: '10000000-0000-0000-0000-000000000005', slug: 'business-development', name: 'Business Development' }
  ];

  let adminPortalCachedUsers = [];
  let adminPortalEventsWired = false;
  let bulkParsedEntries = [];

  async function renderAdminPortal() {
    if (!el.adminUsersTableBody) return;
    el.adminUsersTableBody.innerHTML = '<tr><td colspan="7" style="padding: 24px; text-align: center; color: var(--text-muted);">Loading user and invitation records...</td></tr>';

    try {
      const records = await window.DataLayer.adminListAccessInvites();
      adminPortalCachedUsers = records || [];
      renderAdminPortalFilteredTable();
    } catch (err) {
      console.error('[Admin] Error loading users:', err);
      el.adminUsersTableBody.innerHTML = `<tr><td colspan="7" style="padding: 24px; text-align: center; color: var(--danger);">Failed to load user directory: ${err.message}</td></tr>`;
    }
  }

  function renderAdminPortalFilteredTable() {
    if (!el.adminUsersTableBody) return;

    const query = el.adminUserSearchInput ? el.adminUserSearchInput.value.trim().toLowerCase() : '';
    const roleFilter = el.adminFilterRole ? el.adminFilterRole.value : '';
    const progFilter = el.adminFilterProg ? el.adminFilterProg.value : '';
    const statusFilter = el.adminFilterStatus ? el.adminFilterStatus.value : '';

    // Count pending users across all records
    const pendingRecords = adminPortalCachedUsers.filter(u => u.status === 'pending' || u.is_pending_approval);
    if (el.adminPendingAlert) {
      if (pendingRecords.length > 0) {
        el.adminPendingAlert.style.display = 'flex';
        if (el.adminPendingAlertTitle) {
          el.adminPendingAlertTitle.textContent = `${pendingRecords.length} User${pendingRecords.length === 1 ? '' : 's'} Waiting for Approval`;
        }
        if (el.adminPendingAlertDesc) {
          el.adminPendingAlertDesc.textContent = `${pendingRecords.length} registered account${pendingRecords.length === 1 ? ' is' : 's are'} awaiting admin approval before they can access the portal.`;
        }
      } else {
        el.adminPendingAlert.style.display = 'none';
      }
    }

    // Apply active filters
    const filtered = adminPortalCachedUsers.filter(u => {
      if (query) {
        const nameMatch = (u.full_name || '').toLowerCase().includes(query);
        const emailMatch = (u.email || '').toLowerCase().includes(query);
        if (!nameMatch && !emailMatch) return false;
      }
      if (roleFilter && u.role !== roleFilter) {
        return false;
      }
      if (progFilter) {
        if (u.role === 'admin') {
          // Admins belong to all programmes, keep them visible or match
        } else if (u.programme_id !== progFilter) {
          return false;
        }
      }
      if (statusFilter && u.status !== statusFilter) {
        return false;
      }
      return true;
    });

    if (el.adminUsersCountChip) {
      el.adminUsersCountChip.textContent = `Showing ${filtered.length} of ${adminPortalCachedUsers.length} entries`;
    }

    if (filtered.length === 0) {
      el.adminUsersTableBody.innerHTML = '<tr><td colspan="7" style="padding: 28px; text-align: center; color: var(--text-muted);">No users or invitations match the selected criteria.</td></tr>';
      return;
    }

    el.adminUsersTableBody.innerHTML = '';
    filtered.forEach(u => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-subtle)';

      // User initials avatar
      const initials = (u.full_name || u.email || 'U').split(/\s+/).map(p => p[0]).slice(0, 2).join('').toUpperCase();
      const avatarHtml = u.avatar_url
        ? `<img src="${u.avatar_url}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-subtle);">`
        : `<div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0,165,68,0.15); color: var(--accent-light); display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 700;">${initials}</div>`;

      // Role badge
      let roleBadge = `<span style="text-transform: capitalize; font-weight: 600;">${u.role || 'intern'}</span>`;
      if (u.role === 'admin') {
        roleBadge = `<span style="background: rgba(168,85,247,0.15); border: 1px solid rgba(168,85,247,0.3); color: #c084fc; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">Admin</span>`;
      } else if (u.role === 'instructor') {
        roleBadge = `<span style="background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3); color: #60a5fa; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700;">Instructor</span>`;
      } else {
        roleBadge = `<span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); color: var(--text-secondary); padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600;">Intern</span>`;
      }

      // Programme assignment name
      let progName = u.programme_name || '--';
      if (u.role === 'admin') {
        progName = `<span style="color: var(--accent-light); font-weight: 600;">All Programmes</span>`;
      } else if (!u.programme_id) {
        progName = `<span style="color: var(--text-muted); font-style: italic;">(Unassigned)</span>`;
      }

      // Status badge
      let statusBadge = '';
      if (u.status === 'active') {
        statusBadge = '<span class="badge-status-active"><span style="width:6px;height:6px;border-radius:50%;background:#00d659;"></span> Active</span>';
      } else if (u.status === 'pending') {
        statusBadge = '<span class="badge-status-pending"><span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span> Pending Approval</span>';
      } else if (u.status === 'revoked') {
        statusBadge = '<span class="badge-status-revoked"><span style="width:6px;height:6px;border-radius:50%;background:#ef4444;"></span> Revoked</span>';
      } else {
        statusBadge = '<span class="badge-status-invited"><span style="width:6px;height:6px;border-radius:50%;background:#60a5fa;"></span> Invited</span>';
      }

      // Joined/Invited Date
      const joinedDateStr = u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '--';
      const lastSeenStr = u.last_seen ? new Date(u.last_seen).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : (u.is_registered ? 'Never' : 'Invited');

      // Actions buttons
      let actionButtons = '';
      if (u.status === 'pending') {
        actionButtons += `<button type="button" class="primary-accent-btn btn-approve-user" style="padding: 4px 10px; font-size: 11.5px; margin-right: 6px;">Approve</button>`;
      }
      actionButtons += `<button type="button" class="form-action-btn secondary btn-edit-user" style="padding: 4px 10px; font-size: 11.5px; margin-right: 6px;">Edit</button>`;

      if (u.status === 'revoked') {
        actionButtons += `<button type="button" class="primary-accent-btn btn-restore-user" style="padding: 4px 10px; font-size: 11.5px; background: #059669;">Restore</button>`;
      } else {
        actionButtons += `<button type="button" class="form-action-btn secondary btn-revoke-user" style="padding: 4px 10px; font-size: 11.5px; color: #ef4444;" title="Revoke user access">Revoke</button>`;
      }

      tr.innerHTML = `
        <td style="padding: 12px 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            ${avatarHtml}
            <div>
              <strong style="display: block; font-size: 13.5px;">${u.full_name || (u.is_registered ? 'Registered User' : 'Invited Member')}</strong>
              <span style="font-size: 12px; color: var(--text-secondary);">${u.email}</span>
            </div>
          </div>
        </td>
        <td style="padding: 12px 14px;">${roleBadge}</td>
        <td style="padding: 12px 14px;">${progName}</td>
        <td style="padding: 12px 14px;">${statusBadge}</td>
        <td style="padding: 12px 14px; font-size: 12px; color: var(--text-secondary);">${joinedDateStr}</td>
        <td style="padding: 12px 14px; font-size: 12px; color: var(--text-secondary);">${lastSeenStr}</td>
        <td style="padding: 12px 14px; text-align: right; white-space: nowrap;">${actionButtons}</td>
      `;

      // Wire action events
      const approveBtn = tr.querySelector('.btn-approve-user');
      if (approveBtn) {
        approveBtn.addEventListener('click', () => openAdminEditModal(u, true));
      }

      const editBtn = tr.querySelector('.btn-edit-user');
      if (editBtn) {
        editBtn.addEventListener('click', () => openAdminEditModal(u, false));
      }

      const revokeBtn = tr.querySelector('.btn-revoke-user');
      if (revokeBtn) {
        revokeBtn.addEventListener('click', async () => {
          if (!confirm(`Are you sure you want to revoke access for ${u.full_name || u.email}? They will immediately be locked out of all portal resources.`)) return;
          try {
            await window.DataLayer.adminRevokeUserAccess(u.id);
            showToast(`Revoked access for ${u.email}`);
            await renderAdminPortal();
          } catch (err) {
            alert('Failed to revoke access: ' + err.message);
          }
        });
      }

      const restoreBtn = tr.querySelector('.btn-restore-user');
      if (restoreBtn) {
        restoreBtn.addEventListener('click', async () => {
          try {
            await window.DataLayer.adminRestoreUserAccess(u.id);
            showToast(`Restored access for ${u.email}`);
            await renderAdminPortal();
          } catch (err) {
            alert('Failed to restore access: ' + err.message);
          }
        });
      }

      el.adminUsersTableBody.appendChild(tr);
    });
  }

  function openAdminEditModal(user, isApproving = false) {
    if (!el.adminEditUserModal) return;
    el.adminEditUserId.value = user.id;
    el.adminEditUserName.textContent = user.full_name || (user.is_registered ? 'Registered User' : 'Invited Member');
    el.adminEditUserEmail.textContent = user.email;

    el.adminEditRoleSelect.value = user.role || 'intern';
    const roleIsAdmin = el.adminEditRoleSelect.value === 'admin';
    el.adminEditProgSelect.disabled = roleIsAdmin;
    if (el.adminEditProgNote) el.adminEditProgNote.style.display = roleIsAdmin ? 'block' : 'none';

    if (user.programme_id) {
      el.adminEditProgSelect.value = user.programme_id;
    } else {
      el.adminEditProgSelect.value = CANONICAL_PROGRAMMES[0].id;
    }

    if (isApproving) {
      el.adminSaveEditUserBtn.textContent = 'Approve & Activate';
    } else {
      el.adminSaveEditUserBtn.textContent = 'Save Changes';
    }

    el.adminEditUserModal.style.display = 'flex';
  }

  function wireAdminPortalEvents() {
    if (adminPortalEventsWired) return;
    adminPortalEventsWired = true;

    // Search and filters
    if (el.adminUserSearchInput) {
      el.adminUserSearchInput.addEventListener('input', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterRole) {
      el.adminFilterRole.addEventListener('change', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterProg) {
      el.adminFilterProg.addEventListener('change', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterStatus) {
      el.adminFilterStatus.addEventListener('change', renderAdminPortalFilteredTable);
    }
    if (el.adminFilterPendingBtn) {
      el.adminFilterPendingBtn.addEventListener('click', () => {
        if (el.adminFilterStatus) {
          el.adminFilterStatus.value = 'pending';
          renderAdminPortalFilteredTable();
        }
      });
    }

    // Tab switching Single vs Bulk Invite
    if (el.adminTabSingleInviteBtn && el.adminTabBulkInviteBtn) {
      el.adminTabSingleInviteBtn.addEventListener('click', () => {
        el.adminTabSingleInviteBtn.classList.add('active');
        el.adminTabBulkInviteBtn.classList.remove('active');
        if (el.adminSingleInviteForm) el.adminSingleInviteForm.style.display = 'block';
        if (el.adminBulkInviteSection) el.adminBulkInviteSection.style.display = 'none';
      });

      el.adminTabBulkInviteBtn.addEventListener('click', () => {
        el.adminTabBulkInviteBtn.classList.add('active');
        el.adminTabSingleInviteBtn.classList.remove('active');
        if (el.adminSingleInviteForm) el.adminSingleInviteForm.style.display = 'none';
        if (el.adminBulkInviteSection) el.adminBulkInviteSection.style.display = 'block';
      });
    }

    // Single Invite Role toggle
    if (el.adminInviteRole) {
      el.adminInviteRole.addEventListener('change', () => {
        const isAdmin = el.adminInviteRole.value === 'admin';
        if (el.adminInviteProgramme) {
          el.adminInviteProgramme.disabled = isAdmin;
        }
        if (el.adminInviteProgNote) {
          el.adminInviteProgNote.style.display = isAdmin ? 'block' : 'none';
        }
      });
    }

    // Single Invite Form Submit
    if (el.adminSingleInviteForm) {
      el.adminSingleInviteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = el.adminInviteEmail.value.trim().toLowerCase();
        const role = el.adminInviteRole.value;
        const programmeId = role === 'admin' ? null : el.adminInviteProgramme.value;

        if (!email) {
          alert('Please enter a valid email address.');
          return;
        }

        el.adminSubmitInviteBtn.disabled = true;
        el.adminSubmitInviteBtn.textContent = 'Sending...';

        try {
          await window.DataLayer.adminInviteUser({ email, role, programmeId });
          showToast(`Access approved/invited for ${email}`);
          el.adminInviteEmail.value = '';
          await renderAdminPortal();
        } catch (err) {
          alert('Failed to send invite: ' + err.message);
        } finally {
          el.adminSubmitInviteBtn.disabled = false;
          el.adminSubmitInviteBtn.textContent = 'Send Invitation / Approve';
        }
      });
    }

    // Bulk Invite File Upload (CSV)
    if (el.adminBulkCsvInput) {
      el.adminBulkCsvInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          if (el.adminBulkTextInput) {
            el.adminBulkTextInput.value = event.target.result;
            validateBulkInput();
          }
        };
        reader.readAsText(file);
      });
    }

    // Bulk Invite Validate Button
    if (el.adminBulkValidateBtn) {
      el.adminBulkValidateBtn.addEventListener('click', validateBulkInput);
    }

    // Bulk Invite Clear Button
    if (el.adminBulkClearBtn) {
      el.adminBulkClearBtn.addEventListener('click', () => {
        if (el.adminBulkTextInput) el.adminBulkTextInput.value = '';
        if (el.adminBulkCsvInput) el.adminBulkCsvInput.value = '';
        if (el.adminBulkPreviewBox) el.adminBulkPreviewBox.style.display = 'none';
        bulkParsedEntries = [];
      });
    }

    // Bulk Invite Confirm Button
    if (el.adminBulkConfirmBtn) {
      el.adminBulkConfirmBtn.addEventListener('click', async () => {
        const validEntries = bulkParsedEntries.filter(e => e.isValid);
        if (validEntries.length === 0) {
          alert('No valid rows found to invite. Please check the validation table.');
          return;
        }

        el.adminBulkConfirmBtn.disabled = true;
        el.adminBulkConfirmBtn.textContent = `Inviting ${validEntries.length} users...`;

        let successCount = 0;
        let failCount = 0;

        for (const entry of validEntries) {
          try {
            await window.DataLayer.adminInviteUser({
              email: entry.email,
              role: entry.role,
              programmeId: entry.programmeId
            });
            successCount++;
          } catch (err) {
            console.warn(`Bulk invite error for ${entry.email}:`, err);
            failCount++;
          }
        }

        showToast(`Bulk invite complete: ${successCount} invited${failCount > 0 ? `, ${failCount} failed` : ''}.`);
        el.adminBulkConfirmBtn.disabled = false;
        el.adminBulkConfirmBtn.textContent = 'Invite All Valid Users';
        if (el.adminBulkTextInput) el.adminBulkTextInput.value = '';
        if (el.adminBulkPreviewBox) el.adminBulkPreviewBox.style.display = 'none';
        bulkParsedEntries = [];
        await renderAdminPortal();
      });
    }

    // Edit User Modal events
    if (el.adminEditRoleSelect) {
      el.adminEditRoleSelect.addEventListener('change', () => {
        const isAdmin = el.adminEditRoleSelect.value === 'admin';
        if (el.adminEditProgSelect) {
          el.adminEditProgSelect.disabled = isAdmin;
        }
        if (el.adminEditProgNote) {
          el.adminEditProgNote.style.display = isAdmin ? 'block' : 'none';
        }
      });
    }

    if (el.adminSaveEditUserBtn) {
      el.adminSaveEditUserBtn.addEventListener('click', async () => {
        const userId = el.adminEditUserId.value;
        const role = el.adminEditRoleSelect.value;
        const programmeId = role === 'admin' ? null : el.adminEditProgSelect.value;

        el.adminSaveEditUserBtn.disabled = true;
        el.adminSaveEditUserBtn.textContent = 'Saving...';

        try {
          await window.DataLayer.adminUpdateUserAccess(userId, { role, programmeId });
          showToast('Updated user permissions successfully.');
          if (el.adminEditUserModal) el.adminEditUserModal.style.display = 'none';
          await renderAdminPortal();
        } catch (err) {
          alert('Failed to update user: ' + err.message);
        } finally {
          el.adminSaveEditUserBtn.disabled = false;
          el.adminSaveEditUserBtn.textContent = 'Save Changes';
        }
      });
    }

    if (el.adminCancelEditUserBtn) {
      el.adminCancelEditUserBtn.addEventListener('click', () => {
        if (el.adminEditUserModal) el.adminEditUserModal.style.display = 'none';
      });
    }
    if (el.closeAdminEditUserModalBtn) {
      el.closeAdminEditUserModalBtn.addEventListener('click', () => {
        if (el.adminEditUserModal) el.adminEditUserModal.style.display = 'none';
      });
    }
  }

  function validateBulkInput() {
    if (!el.adminBulkTextInput || !el.adminBulkPreviewBox || !el.adminBulkPreviewTbody) return;
    const raw = el.adminBulkTextInput.value.trim();
    if (!raw) {
      alert('Please enter or paste at least one line of user data.');
      return;
    }

    const lines = raw.split(/\\r?\\n/).filter(l => l.trim().length > 0);
    bulkParsedEntries = [];

    lines.forEach((line, idx) => {
      // Split by comma or semicolon
      const parts = line.split(/[,;]/).map(p => p.trim());
      const email = (parts[0] || '').toLowerCase();
      const roleRaw = (parts[1] || 'intern').toLowerCase();
      const progRaw = (parts[2] || '').toLowerCase();

      let role = 'intern';
      if (roleRaw.includes('admin')) role = 'admin';
      else if (roleRaw.includes('instruct')) role = 'instructor';

      const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email);
      let programmeId = null;
      let programmeName = role === 'admin' ? 'All Programmes (Admin)' : '';
      let error = null;

      if (!emailValid) {
        error = 'Invalid email syntax';
      } else if (role !== 'admin') {
        const matchProg = CANONICAL_PROGRAMMES.find(p =>
          p.name.toLowerCase().includes(progRaw) ||
          p.slug.toLowerCase().includes(progRaw) ||
          p.id === progRaw
        );
        if (matchProg) {
          programmeId = matchProg.id;
          programmeName = matchProg.name;
        } else {
          // Default to first if omitted or specify error
          if (!progRaw) {
            programmeId = CANONICAL_PROGRAMMES[0].id;
            programmeName = CANONICAL_PROGRAMMES[0].name;
          } else {
            error = `Unknown programme "${parts[2]}"`;
          }
        }
      }

      bulkParsedEntries.push({
        lineNum: idx + 1,
        email,
        role,
        programmeId,
        programmeName,
        isValid: !error,
        error
      });
    });

    el.adminBulkPreviewTbody.innerHTML = '';
    bulkParsedEntries.forEach(e => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${e.email}</strong></td>
        <td style="text-transform: capitalize;">${e.role}</td>
        <td>${e.programmeName || '--'}</td>
        <td>
          ${e.isValid
            ? '<span style="color: #00d659; font-weight: 700;">&#10003; Valid</span>'
            : `<span style="color: #ef4444; font-weight: 600;">&#10007; ${e.error}</span>`}
        </td>
      `;
      el.adminBulkPreviewTbody.appendChild(tr);
    });

    el.adminBulkPreviewBox.style.display = 'block';
  }

  function applyRolePermissions(profile) {
    const role = profile?.role || 'intern';
    if (el.navAdmin) {
      el.navAdmin.style.display = (role === 'admin') ? 'flex' : 'none';
    }

    if (el.programmeSelect) {
      if (role === 'admin') {
        el.programmeSelect.disabled = false;
        el.programmeSelect.title = 'Switch cohort programme (Admin access)';
      } else {
        // Intern or Instructor locked to their assigned programme
        el.programmeSelect.disabled = true;
        el.programmeSelect.title = 'Assigned cohort programme (managed by Admin)';
        if (profile?.programme_id) {
          const key = getProgrammeKey(profile.programme_id);
          currentProgrammeId = key;
          el.programmeSelect.value = key;
        }
      }
    }
  }

  """
    code = code[:start_idx] + new_admin_block + code[end_idx:]
    print("Replaced admin block & applyRolePermissions successfully.")
else:
    print(f"WARNING: admin block bounds not found! start_idx={start_idx}, end_idx={end_idx}")

# 4. Update handleSuccessfulAuth to enforce access gating
target_auth_block = """    // Load profile from DataLayer if authenticated
    if (window.DataLayer && userData.id) {
      try {
        const profile = await window.DataLayer.getProfile(userData.id);
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
        }
      } catch (err) {
        console.warn('[DataLayer] Auth profile load error:', err);
      }
    }"""

replacement_auth_block = """    // Load profile from DataLayer if authenticated & check access gating
    if (window.DataLayer && userData.id) {
      try {
        const profile = await window.DataLayer.getProfile(userData.id);
        if (profile) {
          const accessStatus = profile.access_status || 'pending';

          // 1. Access Pending: User is registered but not yet approved/assigned by Admin
          if (accessStatus === 'pending') {
            if (el.pendingUserEmail) el.pendingUserEmail.textContent = profile.email || userData.email || '--';
            if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'flex';
            if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';
            if (el.authScreen) el.authScreen.style.display = 'none';
            if (el.appShell) el.appShell.style.display = 'none';
            // CRITICAL: Block all portal data loading
            return;
          }

          // 2. Access Revoked: User account has been deactivated by Admin
          if (accessStatus === 'revoked') {
            if (el.revokedUserEmail) el.revokedUserEmail.textContent = profile.email || userData.email || '--';
            if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'flex';
            if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
            if (el.authScreen) el.authScreen.style.display = 'none';
            if (el.appShell) el.appShell.style.display = 'none';
            // CRITICAL: Block all portal data loading
            return;
          }

          // 3. Active User: Hide gating screens and configure portal
          if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
          if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';

          state.profile.role = profile.role || 'Intern';
          state.profile.name = profile.full_name || profile.display_name || state.profile.name;
          state.profile.branch = profile.branch || state.profile.branch;
          state.profile.position = profile.position || state.profile.position;
          state.profile.phone = profile.phone || state.profile.phone;
          state.profile.avatar_url = profile.avatar_url || state.profile.avatar_url;
          if (profile.programme) state.profile.programmeName = profile.programme.name;
          applyRolePermissions(profile);
        }
      } catch (err) {
        console.warn('[DataLayer] Auth profile load error:', err);
      }
    }"""

if target_auth_block in code:
    code = code.replace(target_auth_block, replacement_auth_block)
    print("Replaced auth block with access gating checks.")
else:
    print("WARNING: target_auth_block not found!")

# 5. Update handleSignOutCleanup to reset gating screens
target_signout = """    localStorage.removeItem('ikaai_portal_session');
    if (el.authScreen) el.authScreen.style.display = 'flex';
    if (el.appShell) el.appShell.style.display = 'none';"""

replacement_signout = """    localStorage.removeItem('ikaai_portal_session');
    if (el.accessPendingScreen) el.accessPendingScreen.style.display = 'none';
    if (el.accessRevokedScreen) el.accessRevokedScreen.style.display = 'none';
    if (el.authScreen) el.authScreen.style.display = 'flex';
    if (el.appShell) el.appShell.style.display = 'none';"""

if target_signout in code:
    code = code.replace(target_signout, replacement_signout)
    print("Updated handleSignOutCleanup successfully.")
else:
    print("WARNING: target_signout not found!")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("app.js written successfully!")

