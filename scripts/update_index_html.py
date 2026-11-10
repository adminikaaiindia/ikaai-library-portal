# scripts/update_index_html.py
with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert accessPendingScreen and accessRevokedScreen right after </section> of authScreen
auth_end_str = '</section>\n\n    <!-- ==========================================\n         MAIN PORTAL APPLICATION SHELL\n         ========================================== -->'
if auth_end_str not in content:
    # Try alternate line endings
    auth_end_str = '</section>\r\n\r\n    <!-- ==========================================\r\n         MAIN PORTAL APPLICATION SHELL\r\n         ========================================== -->'

if auth_end_str not in content:
    # Try finding </section> followed by appShell
    idx = content.find('id="authScreen"')
    sec_end = content.find('</section>', idx)
    auth_end_str = content[sec_end:sec_end+10] # '</section>'

gating_html = """
    <!-- ==========================================
         ACCESS GATING: PENDING APPROVAL SCREEN
         ========================================== -->
    <section class="full-gate-screen" id="accessPendingScreen" style="display: none;">
      <div class="gate-card">
        <div class="gate-brand-header">
          <div class="logo-wrapper auth-logo-box">
            <img src="logo.png" alt="Ikaai Logo" class="brand-logo">
          </div>
          <span class="auth-brand-badge">LIBRARY</span>
        </div>

        <div class="gate-icon-circle pending">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>

        <h1 class="gate-title">Access Pending Approval</h1>
        <p class="gate-subtitle">Your account is registered but awaiting admin authorization and programme cohort assignment before you can access library resources.</p>

        <div class="gate-email-chip" id="pendingUserEmailBadge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span id="pendingUserEmail">user@ikaaiindia.org</span>
        </div>

        <div class="gate-info-box">
          <strong style="color: var(--text-primary); display: block; margin-bottom: 4px;">What happens next?</strong>
          An Ikaai administrator will review your account, assign your designated programme curriculum, and grant access. If you were recently invited or approved, click <strong>Check Status</strong> below to refresh your access.
        </div>

        <div class="gate-actions">
          <button type="button" class="primary-accent-btn" id="pendingRefreshBtn" style="padding: 10px 22px;">Check Status</button>
          <button type="button" class="form-action-btn secondary" id="pendingSignOutBtn" style="padding: 10px 22px;">Sign Out</button>
        </div>
      </div>
    </section>

    <!-- ==========================================
         ACCESS GATING: ACCESS REVOKED SCREEN
         ========================================== -->
    <section class="full-gate-screen" id="accessRevokedScreen" style="display: none;">
      <div class="gate-card">
        <div class="gate-brand-header">
          <div class="logo-wrapper auth-logo-box">
            <img src="logo.png" alt="Ikaai Logo" class="brand-logo">
          </div>
          <span class="auth-brand-badge">LIBRARY</span>
        </div>

        <div class="gate-icon-circle revoked">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        </div>

        <h1 class="gate-title">Access Revoked</h1>
        <p class="gate-subtitle">Your portal access has been revoked by an administrator. You can no longer access curriculum or library resources.</p>

        <div class="gate-email-chip" id="revokedUserEmailBadge">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span id="revokedUserEmail">user@ikaaiindia.org</span>
        </div>

        <div class="gate-info-box">
          If you believe this is in error or need your credentials reactivated, please contact your programme coordinator or Ikaai IT administrator at <strong>admin@ikaaiindia.org</strong>.
        </div>

        <div class="gate-actions">
          <button type="button" class="form-action-btn secondary" id="revokedSignOutBtn" style="padding: 10px 26px;">Sign Out</button>
        </div>
      </div>
    </section>
"""

# Insert gating screens right after </section> of authScreen
idx_auth = content.find('id="authScreen"')
sec_end = content.find('</section>', idx_auth) + len('</section>')
content = content[:sec_end] + "\n" + gating_html + content[sec_end:]

# 2. Replace adminScreenView and remove programmeSelectModal
new_admin_html = """    <!-- ========================================== -->
    <!-- SCREEN 10: ADMIN PORTAL (USERS & ACCESS)   -->
    <!-- ========================================== -->
    <div class="screen-view" id="adminScreenView">
      <div class="card" style="padding: 24px;">
        <div class="screen-hero-header" style="margin-bottom: 20px;">
          <div>
            <h2 class="view-title">Users &amp; Access Control</h2>
            <p class="view-subtitle">Authorize team members, manage role privileges, and assign cohort learning programmes.</p>
          </div>
        </div>

        <!-- Pending Approvals Alert Banner -->
        <div class="admin-pending-alert" id="adminPendingAlert" style="display: none;">
          <div class="admin-pending-alert-content">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); display: flex; align-items: center; justify-content: center; color: #f59e0b; flex-shrink: 0;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div>
              <strong style="color: #f59e0b; font-size: 14px;" id="adminPendingAlertTitle">Users Waiting for Approval</strong>
              <div style="font-size: 12.5px; color: var(--text-secondary);" id="adminPendingAlertDesc">There are accounts awaiting approval before they can enter the portal.</div>
            </div>
          </div>
          <button type="button" class="primary-accent-btn" id="adminFilterPendingBtn" style="padding: 6px 14px; font-size: 12px; flex-shrink: 0;">Review Pending</button>
        </div>

        <!-- Invite User Card (Single & Bulk) -->
        <div class="admin-invite-card">
          <div class="admin-tab-nav">
            <button type="button" class="admin-tab-nav-btn active" id="adminTabSingleInviteBtn">Single User Invite</button>
            <button type="button" class="admin-tab-nav-btn" id="adminTabBulkInviteBtn">Bulk Invite (CSV / Paste)</button>
          </div>

          <!-- Tab 1: Single User Invite Form -->
          <form id="adminSingleInviteForm" style="display: block;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 16px;">
              <div>
                <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Email Address *</label>
                <input type="email" id="adminInviteEmail" class="form-text-input" placeholder="e.g. learner@ikaaiindia.org" required>
              </div>
              <div>
                <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Role *</label>
                <select id="adminInviteRole" class="form-text-input">
                  <option value="intern">Intern</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Programme Assignment *</label>
                <select id="adminInviteProgramme" class="form-text-input">
                  <option value="10000000-0000-0000-0000-000000000001">Human Resources</option>
                  <option value="10000000-0000-0000-0000-000000000002">Data Analyst</option>
                  <option value="10000000-0000-0000-0000-000000000003">Social Research &amp; Policy</option>
                  <option value="10000000-0000-0000-0000-000000000004">Design &amp; Social Media</option>
                  <option value="10000000-0000-0000-0000-000000000005">Business Development</option>
                </select>
                <div id="adminInviteProgNote" style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: none;">Admins have unrestricted access across all 5 programmes.</div>
              </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px;">
              <button type="submit" class="primary-accent-btn" id="adminSubmitInviteBtn" style="padding: 9px 22px; font-size: 13px;">Send Invitation / Approve</button>
            </div>
          </form>

          <!-- Tab 2: Bulk Invite Form -->
          <div id="adminBulkInviteSection" style="display: none;">
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
              Paste multiple entries (one per line) in format: <code>email, role, programme</code><br>
              <span style="font-size: 11.5px; color: var(--text-muted);">Example: <code>priya@ikaaiindia.org, intern, Data Analyst</code></span>
            </p>
            <div style="display: flex; gap: 12px; margin-bottom: 12px; flex-wrap: wrap;">
              <label class="form-action-btn secondary" style="cursor: pointer; padding: 7px 14px; font-size: 12.5px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload CSV File
                <input type="file" id="adminBulkCsvInput" accept=".csv,.txt" style="display: none;">
              </label>
              <button type="button" class="form-action-btn secondary" id="adminBulkClearBtn" style="padding: 7px 14px; font-size: 12.5px;">Clear</button>
            </div>
            <textarea id="adminBulkTextInput" class="form-text-input" rows="4" placeholder="learner1@ikaaiindia.org, intern, Human Resources&#10;analyst2@ikaaiindia.org, intern, Data Analyst" style="font-family: monospace; font-size: 12px; line-height: 1.5;"></textarea>

            <div style="display: flex; gap: 10px; margin-top: 12px; justify-content: flex-end;">
              <button type="button" class="primary-accent-btn" id="adminBulkValidateBtn" style="padding: 8px 18px; font-size: 12.5px;">Validate &amp; Preview</button>
            </div>

            <!-- Bulk Preview Container -->
            <div id="adminBulkPreviewBox" style="display: none; margin-top: 16px;">
              <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Validation Preview:</h4>
              <div style="overflow-x: auto; max-height: 220px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                <table class="bulk-preview-table" id="adminBulkPreviewTable">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Programme</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="adminBulkPreviewTbody"></tbody>
                </table>
              </div>
              <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                <button type="button" class="primary-accent-btn" id="adminBulkConfirmBtn" style="padding: 9px 22px; font-size: 13px;">Invite All Valid Users</button>
              </div>
            </div>
          </div>
        </div>

        <!-- All Users & Invites Section -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
            <h3 style="font-size: 16px; font-weight: 700;">Platform Directory &amp; Access Status</h3>
            <span id="adminUsersCountChip" style="font-size: 12px; color: var(--text-muted); background: rgba(255,255,255,0.03); padding: 4px 10px; border-radius: 9999px; border: 1px solid var(--border-subtle);">0 entries</span>
          </div>

          <!-- Filters Row -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 16px;">
            <input type="text" id="adminUserSearchInput" class="form-text-input" placeholder="Search by name or email...">
            <select id="adminFilterRole" class="form-text-input">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="intern">Intern</option>
            </select>
            <select id="adminFilterProg" class="form-text-input">
              <option value="">All Programmes</option>
              <option value="10000000-0000-0000-0000-000000000001">Human Resources</option>
              <option value="10000000-0000-0000-0000-000000000002">Data Analyst</option>
              <option value="10000000-0000-0000-0000-000000000003">Social Research &amp; Policy</option>
              <option value="10000000-0000-0000-0000-000000000004">Design &amp; Social Media</option>
              <option value="10000000-0000-0000-0000-000000000005">Business Development</option>
            </select>
            <select id="adminFilterStatus" class="form-text-input">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending Approval</option>
              <option value="invited">Invited</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          <!-- Users & Invites Table -->
          <div style="overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 860px;">
              <thead style="background: var(--bg-card); border-bottom: 1px solid var(--border-subtle);">
                <tr style="text-align: left; color: var(--text-muted); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.5px;">
                  <th style="padding: 12px 14px;">User</th>
                  <th style="padding: 12px 14px;">Role</th>
                  <th style="padding: 12px 14px;">Programme Assignment</th>
                  <th style="padding: 12px 14px;">Status</th>
                  <th style="padding: 12px 14px;">Joined / Invited</th>
                  <th style="padding: 12px 14px;">Last Seen</th>
                  <th style="padding: 12px 14px; text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody id="adminUsersTableBody">
                <tr>
                  <td colspan="7" style="padding: 24px; text-align: center; color: var(--text-muted);">Loading user records...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT USER MODAL -->
    <div class="modal-overlay" id="adminEditUserModal" style="display: none;" role="dialog" aria-modal="true">
      <div class="modal-card" style="max-width: 480px; padding: 24px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg);">
        <div class="modal-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
          <div>
            <span class="modal-kicker" style="color: var(--accent-light); font-size: 11px; font-weight: 700;">USER ACCESS</span>
            <h3 class="modal-title" style="font-size: 18px; margin-top: 4px;">Edit User Permissions</h3>
          </div>
          <button type="button" class="icon-btn" id="closeAdminEditUserModalBtn" style="font-size: 20px;">&times;</button>
        </div>
        <input type="hidden" id="adminEditUserId">
        <div style="margin-bottom: 14px;">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">User:</div>
          <strong id="adminEditUserName" style="font-size: 14px;">--</strong>
          <div id="adminEditUserEmail" style="font-size: 12.5px; color: var(--text-secondary);">--</div>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Role *</label>
          <select id="adminEditRoleSelect" class="form-text-input">
            <option value="intern">Intern</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px;">Programme Assignment *</label>
          <select id="adminEditProgSelect" class="form-text-input">
            <option value="10000000-0000-0000-0000-000000000001">Human Resources</option>
            <option value="10000000-0000-0000-0000-000000000002">Data Analyst</option>
            <option value="10000000-0000-0000-0000-000000000003">Social Research &amp; Policy</option>
            <option value="10000000-0000-0000-0000-000000000004">Design &amp; Social Media</option>
            <option value="10000000-0000-0000-0000-000000000005">Business Development</option>
          </select>
          <div id="adminEditProgNote" style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: none;">Admins have unrestricted access across all 5 programmes.</div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="form-action-btn secondary" id="adminCancelEditUserBtn" style="padding: 8px 16px;">Cancel</button>
          <button type="button" class="primary-accent-btn" id="adminSaveEditUserBtn" style="padding: 8px 20px;">Save Changes</button>
        </div>
      </div>
    </div>
"""

# Replace from adminScreenView up to the start of chatNewModal
admin_idx = content.find('<!-- SCREEN 10: ADMIN PORTAL')
if admin_idx == -1:
    admin_idx = content.find('id="adminScreenView"')
    admin_idx = content.rfind('<!--', 0, admin_idx)

chat_modal_idx = content.find('<!-- 1. NEW CHAT MODAL')

print(f"Replacing from index {admin_idx} to {chat_modal_idx}")
content = content[:admin_idx] + new_admin_html + "\n\n    " + content[chat_modal_idx:]

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("index.html updated successfully!")

