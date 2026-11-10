import re

print("--- PATCHING ACCOUNT SETTINGS ---")

# 1. PATCH STYLES.CSS
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

account_css_additions = """
/* Account Settings Avatar & Badges */
.settings-avatar-row {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.settings-avatar-circle {
  width: 72px;
  height: 72px;
  border-radius: var(--radius-full);
  background: linear-gradient(135deg, #00a544, #00511e);
  color: #ffffff;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.settings-avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.account-info-banner {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: rgba(0, 165, 68, 0.08);
  border: 1px solid rgba(0, 165, 68, 0.25);
  color: var(--text-primary);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.account-feedback-banner {
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 12.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.account-feedback-banner.success {
  background: rgba(0, 165, 68, 0.15);
  border: 1px solid rgba(0, 165, 68, 0.35);
  color: var(--accent-light, #00d659);
}

.account-feedback-banner.error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #ef4444;
}

.status-unverified-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  background-color: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  font-size: 11px;
  font-weight: 700;
}
"""

if '.settings-avatar-circle' not in css:
    css += '\n' + account_css_additions
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Updated styles.css successfully.")
else:
    print("styles.css already has account additions.")


# 2. PATCH INDEX.HTML
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target_html = """    <!-- ========================================== -->
    <!-- SCREEN 9: ACCOUNT SETTINGS                 -->
    <!-- ========================================== -->
    <div class="screen-view" id="settingsScreenView">
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div class="card account-info-card" style="padding: 24px;">
          <div class="screen-hero-header" style="margin-bottom: 18px;">
            <div>
              <h2 class="view-title">Account Settings</h2>
              <p class="view-subtitle">Manage your profile information and verification status</p>
            </div>
          </div>
          <div class="account-details-grid" style="display: flex; flex-direction: column; gap: 12px;">
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Email Address</span>
              <span class="detail-value" id="profileEmail" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Current Role</span>
              <span class="detail-value" id="profileRole" style="color: var(--text-primary); font-weight: 600;">Intern</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Branch</span>
              <span class="detail-value" id="profileBranch" style="color: var(--text-primary); font-weight: 600;">Ikaai HQ - New Delhi</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Position</span>
              <span class="detail-value" id="profilePosition" style="color: var(--text-primary); font-weight: 600;">Cohort Trainee</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Member Since</span>
              <span class="detail-value" id="profileMemberSince" style="color: var(--text-primary); font-weight: 600;">November 2026</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Account Verification</span>
              <span class="status-verified-badge" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: var(--radius-full); background: rgba(0, 165, 68, 0.15); color: var(--accent-light); font-size: 11px; font-weight: 700;">✓ Active Cohort</span>
            </div>
          </div>
        </div>

        <div class="card account-actions-card" style="padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Edit Profile Name</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 16px;">Update how your name appears across discussions, evaluations, and grading certificates.</p>
          <form id="profileActionsForm" style="display: flex; flex-direction: column; gap: 14px; max-width: 480px;">
            <div class="modal-form-group">
              <label class="modal-field-label">Full Name</label>
              <input type="text" id="userNameInput" class="form-text-input" placeholder="Your full name" required>
            </div>
            <div class="form-actions-row">
              <button type="submit" class="primary-accent-btn" style="padding: 10px 24px;">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>"""

replacement_html = """    <!-- ========================================== -->
    <!-- SCREEN 9: ACCOUNT SETTINGS                 -->
    <!-- ========================================== -->
    <div class="screen-view" id="settingsScreenView">
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- 1. Profile Overview Card -->
        <div class="card account-info-card" style="padding: 24px;">
          <div class="screen-hero-header" style="margin-bottom: 18px;">
            <div>
              <h2 class="view-title">Account Settings</h2>
              <p class="view-subtitle">Manage your official profile, credentials, and verification status</p>
            </div>
          </div>
          <div class="account-details-grid" style="display: flex; flex-direction: column; gap: 12px;">
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Email Address</span>
              <span class="detail-value" id="profileEmail" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Sign-in Method</span>
              <span class="detail-value" id="profileSignInMethod" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Current Role</span>
              <span class="detail-value" id="profileRole" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Assigned Programme</span>
              <span class="detail-value" id="profileProgramme" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Office Branch</span>
              <span class="detail-value" id="profileBranch" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Position Title</span>
              <span class="detail-value" id="profilePosition" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Member Since</span>
              <span class="detail-value" id="profileMemberSince" style="color: var(--text-primary); font-weight: 600;">--</span>
            </div>
            <div class="account-row" style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); font-size: 13.5px;">
              <span class="detail-label" style="color: var(--text-secondary);">Account Verification</span>
              <span class="status-verified-badge" id="profileVerifiedBadge">--</span>
            </div>
          </div>
        </div>

        <!-- 2. Profile Photo Card -->
        <div class="card account-actions-card" style="padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Profile Photo</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 16px;">Upload a personal profile picture (PNG, JPG, WebP up to 2 MB). Your photo will appear in the top bar and discussions.</p>
          <div class="settings-avatar-row">
            <div class="settings-avatar-circle" id="settingsAvatarPreview">--</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <input type="file" id="avatarFileInput" accept=".png,.jpg,.jpeg,.webp" style="display: none;">
                <button type="button" class="primary-accent-btn" id="uploadAvatarBtn" style="padding: 8px 18px; font-size: 13px;">Upload Photo</button>
                <button type="button" class="danger-outline-btn" id="removeAvatarBtn" style="display: none; padding: 8px 18px; font-size: 13px;">Remove Photo</button>
              </div>
              <div id="avatarFeedback" style="display: none;"></div>
            </div>
          </div>
        </div>

        <!-- 3. Edit Personal Information Card -->
        <div class="card account-actions-card" style="padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Personal Information</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 16px;">Update how your full legal name appears across evaluations and certificates, and your optional contact phone number.</p>
          <form id="profileActionsForm" style="display: flex; flex-direction: column; gap: 14px; max-width: 520px;">
            <div class="modal-form-group">
              <label class="modal-field-label">Full Name <span style="color: var(--accent-light);">*</span></label>
              <input type="text" id="userNameInput" class="form-text-input" placeholder="Your full legal name" minlength="2" maxlength="60" required>
            </div>
            <div class="modal-form-group">
              <label class="modal-field-label">Phone Number <span style="font-size: 11px; color: var(--text-secondary); font-weight: 400;">(Optional)</span></label>
              <input type="tel" id="userPhoneInput" class="form-text-input" placeholder="+91 98765 43210">
            </div>
            <div id="profileDetailsFeedback" style="display: none;"></div>
            <div class="form-actions-row">
              <button type="submit" class="primary-accent-btn" id="saveProfileBtn" style="padding: 10px 24px;">Save Changes</button>
            </div>
          </form>
        </div>

        <!-- 4. Security & Password Card -->
        <div class="card account-actions-card" style="padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Security & Password</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 16px;">Manage your account password and security credentials.</p>
          
          <!-- Notice for Google-authenticated users -->
          <div id="googleUserNotice" class="account-info-banner" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>You sign in with Google. Password management and account security are handled through your Google account.</span>
          </div>

          <!-- Password change form for email users -->
          <div id="emailUserPasswordWrap" style="display: none;">
            <form id="passwordChangeForm" style="display: flex; flex-direction: column; gap: 14px; max-width: 520px;">
              <div class="modal-form-group">
                <label class="modal-field-label">New Password <span style="font-size: 11px; color: var(--text-secondary); font-weight: 400;">(Min 8 characters)</span></label>
                <input type="password" id="newPasswordInput" class="form-text-input" placeholder="Enter new password" minlength="8" required autocomplete="new-password">
              </div>
              <div class="modal-form-group">
                <label class="modal-field-label">Confirm New Password</label>
                <input type="password" id="confirmPasswordInput" class="form-text-input" placeholder="Re-enter new password" minlength="8" required autocomplete="new-password">
              </div>
              <div id="passwordFeedback" style="display: none;"></div>
              <div class="form-actions-row">
                <button type="submit" class="primary-accent-btn" id="changePasswordBtn" style="padding: 10px 24px;">Update Password</button>
              </div>
            </form>
          </div>
        </div>

        <!-- 5. Session Management Card -->
        <div class="card account-actions-card" style="padding: 24px;">
          <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">Session Management</h3>
          <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 16px;">Sign out of your active session on this device, or revoke access on all connected devices.</p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button type="button" class="outline-btn" id="accountSignOutBtn" style="padding: 9px 20px;">Sign Out</button>
            <button type="button" class="danger-outline-btn" id="accountSignOutAllBtn" style="padding: 9px 20px;">Sign Out of All Devices</button>
          </div>
          <div id="sessionFeedback" style="display: none; margin-top: 10px;"></div>
        </div>

      </div>
    </div>"""

if target_html in html:
    html = html.replace(target_html, replacement_html)
    # Update cache buster
    html = html.replace('v=20261106_v4', 'v=20261106_v5')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Updated index.html successfully.")
else:
    print("ERROR: target_html not found in index.html!")

