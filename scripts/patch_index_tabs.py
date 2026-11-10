# encoding: utf-8
import sys

print("Patching index.html for Tab 1 (Programme), Tab 2 (My Documents), and Tab 3 (Manage)...")

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Subtitle in Header
old_subtitle = '<p class="comp-res-subtitle">Official documents issued by Ikaai India for your programme.</p>'
new_subtitle = '<p class="comp-res-subtitle">Official documents issued by Ikaai India for your programme and for you personally.</p>'
if old_subtitle in html:
    html = html.replace(old_subtitle, new_subtitle, 1)
    print("[OK] Updated header subtitle")

# 2. Add Top Navigation Tabs (Programme Documents, My Documents, Manage) & Panes
old_header_end = """                  <!-- Admin & Instructor "Issue document" button -->
                  <button type="button" class="primary-btn comp-res-issue-btn" id="openIssueDocBtn" style="display: none;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Issue Document</span>
                  </button>
                </div>
              </div>

              <!-- Tabs: Published / Drafts (Drafts visible only to Admin/Instructor) -->"""

new_header_and_tabs = """                  <!-- Admin & Instructor "Issue document" button -->
                  <button type="button" class="primary-btn comp-res-issue-btn" id="openIssueDocBtn" style="display: none;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Issue Programme Doc</span>
                  </button>
                </div>
              </div>

              <!-- TOP-LEVEL SECTION TABS -->
              <div class="comp-res-main-tabs" id="compResMainTabsBar" role="tablist">
                <button type="button" class="comp-res-main-tab active" id="compResNavTabProgramme" data-main-tab="programme" role="tab" aria-selected="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                  <span>Programme Documents</span>
                  <span class="comp-res-tab-count" id="compResNavProgrammeCount">0</span>
                </button>
                <button type="button" class="comp-res-main-tab" id="compResNavTabPersonal" data-main-tab="personal" role="tab" aria-selected="false">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>My Documents</span>
                  <span class="comp-res-tab-count" id="compResNavPersonalCount">0</span>
                </button>
                <button type="button" class="comp-res-main-tab" id="compResNavTabManage" data-main-tab="manage" role="tab" aria-selected="false" style="display: none;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  <span>Manage</span>
                </button>
              </div>

              <!-- PANE 1: PROGRAMME DOCUMENTS -->
              <div class="comp-res-pane" id="compResPaneProgramme">
              <!-- Tabs: Published / Drafts (Drafts visible only to Admin/Instructor) -->"""

if old_header_end in html:
    html = html.replace(old_header_end, new_header_and_tabs, 1)
    print("[OK] Replaced header end with top-level tabs and opened Pane 1")

# 3. Close Pane 1 and Add Pane 2 (My Documents) & Pane 3 (Manage)
old_screen_end = """              <!-- Empty State -->
              <div class="comp-res-empty-state" id="compResEmptyState" style="display: none;">
                <div class="comp-res-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h3 class="comp-res-empty-title" id="compResEmptyTitle">No documents have been issued for your programme yet.</h3>
                <p class="comp-res-empty-desc" id="compResEmptyDesc">Check back later or contact your instructor if you need official documents.</p>
              </div>
            </div>"""

new_screen_end = """              <!-- Empty State -->
              <div class="comp-res-empty-state" id="compResEmptyState" style="display: none;">
                <div class="comp-res-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h3 class="comp-res-empty-title" id="compResEmptyTitle">No documents have been issued for your programme yet.</h3>
                <p class="comp-res-empty-desc" id="compResEmptyDesc">Check back later or contact your instructor if you need official documents.</p>
              </div>
              </div><!-- END compResPaneProgramme -->

              <!-- ==========================================
                   PANE 2: MY DOCUMENTS (PERSONAL DOCUMENTS)
                   ========================================== -->
              <div class="comp-res-pane" id="compResPanePersonal" style="display: none;">
                <!-- Privacy Note Banner -->
                <div class="comp-res-privacy-banner">
                  <div class="comp-res-privacy-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div class="comp-res-privacy-text">
                    <strong>Confidential &amp; Personal:</strong>
                    These documents are private to you. Only you and authorised administrators can access them. Covered under India's Digital Personal Data Protection (DPDP) Act.
                  </div>
                </div>

                <!-- Personal Toolbar: Search, Category Chips -->
                <div class="comp-res-toolbar">
                  <div class="comp-res-search-wrap">
                    <svg class="comp-res-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" id="compResPersonalSearchInput" class="comp-res-search-input" placeholder="Search your personal documents..." aria-label="Search personal documents">
                    <button type="button" class="comp-res-search-clear" id="compResPersonalSearchClear" style="display: none;" title="Clear search">&times;</button>
                  </div>

                  <div class="comp-res-view-toggle" role="group" aria-label="Personal layout toggle">
                    <button type="button" class="comp-res-toggle-btn active" id="compResPersonalViewGridBtn" title="Grid View">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    </button>
                    <button type="button" class="comp-res-toggle-btn" id="compResPersonalViewListBtn" title="List View">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </button>
                  </div>
                </div>

                <!-- Personal Category Filter Chips -->
                <div class="comp-res-chips-bar" id="compResPersonalCategoryChips">
                  <button type="button" class="comp-res-chip active" data-category="all">All</button>
                  <button type="button" class="comp-res-chip" data-category="offer_letter">Offer &amp; Appointment</button>
                  <button type="button" class="comp-res-chip" data-category="certificate">Certificates</button>
                  <button type="button" class="comp-res-chip" data-category="id_card">ID &amp; Access Cards</button>
                  <button type="button" class="comp-res-chip" data-category="evaluation_letter">Performance &amp; Evaluation</button>
                  <button type="button" class="comp-res-chip" data-category="agreement">Agreements &amp; Declarations</button>
                  <button type="button" class="comp-res-chip" data-category="payslip">Payslips &amp; Stipend</button>
                  <button type="button" class="comp-res-chip" data-category="other">Other</button>
                </div>

                <!-- Personal Documents Content Container -->
                <div class="comp-res-content" id="compResPersonalContent"></div>

                <!-- Empty State for Personal Docs -->
                <div class="comp-res-empty-state" id="compResPersonalEmptyState" style="display: none;">
                  <div class="comp-res-empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 class="comp-res-empty-title">No personal documents have been issued to you yet.</h3>
                  <p class="comp-res-empty-desc">When official letters, certificates, agreements, or cards are issued directly to your name, they will appear here privately.</p>
                </div>
              </div><!-- END compResPanePersonal -->

              <!-- ==========================================
                   PANE 3: MANAGE (ADMINS ONLY)
                   ========================================== -->
              <div class="comp-res-pane" id="compResPaneManage" style="display: none;">
                <div class="comp-res-manage-header">
                  <div>
                    <h2 class="comp-res-manage-title">Personal Documents Management</h2>
                    <p class="comp-res-manage-subtitle">Issue personal contracts, letters, certificates, and view access audit logs.</p>
                  </div>
                  <div class="comp-res-manage-actions">
                    <button type="button" class="secondary-btn" id="openBulkIssueModalBtn" style="display: inline-flex; align-items: center; gap: 8px;">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      <span>Bulk Issue (CSV)</span>
                    </button>
                    <button type="button" class="primary-btn" id="openIssuePersonalDocBtn" style="display: inline-flex; align-items: center; gap: 8px;">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      <span>Issue Personal Document</span>
                    </button>
                  </div>
                </div>

                <!-- Manage Sub-navigation tabs -->
                <div class="comp-res-tabs-bar" id="compResManageSubTabs">
                  <button type="button" class="comp-res-tab active" id="compResManageTabDocs" data-manage-view="docs">
                    <span>Issued Documents</span>
                    <span class="comp-res-tab-count" id="compResManageDocsCount">0</span>
                  </button>
                  <button type="button" class="comp-res-tab" id="compResManageTabUsers" data-manage-view="users">
                    <span>Per-User Dossier</span>
                  </button>
                  <button type="button" class="comp-res-tab" id="compResManageTabLogs" data-manage-view="logs">
                    <span>Access Audit Logs</span>
                  </button>
                </div>

                <!-- Manage Filters Bar -->
                <div class="comp-res-manage-filters" id="compResManageFiltersBar">
                  <div class="comp-res-filter-group">
                    <label class="comp-res-filter-label">Recipient</label>
                    <select id="compResManageRecipientFilter" class="comp-res-manage-select">
                      <option value="all">All Recipients</option>
                    </select>
                  </div>

                  <div class="comp-res-filter-group">
                    <label class="comp-res-filter-label">Category</label>
                    <select id="compResManageCategoryFilter" class="comp-res-manage-select">
                      <option value="all">All Categories</option>
                      <option value="offer_letter">Offer Letters</option>
                      <option value="certificate">Certificates</option>
                      <option value="id_card">ID Cards</option>
                      <option value="evaluation_letter">Evaluations</option>
                      <option value="agreement">Agreements</option>
                      <option value="payslip">Payslips</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="comp-res-filter-group">
                    <label class="comp-res-filter-label">Acknowledgement</label>
                    <select id="compResManageAckFilter" class="comp-res-manage-select">
                      <option value="all">All Statuses</option>
                      <option value="true">Acknowledged</option>
                      <option value="false">Pending Acknowledgement</option>
                    </select>
                  </div>

                  <div class="comp-res-filter-group">
                    <label class="comp-res-filter-label">Record Status</label>
                    <select id="compResManageRevokedFilter" class="comp-res-manage-select">
                      <option value="false">Active Only</option>
                      <option value="true">Revoked Only</option>
                      <option value="all">All Records</option>
                    </select>
                  </div>

                  <div class="comp-res-filter-group" style="flex: 1; min-width: 200px;">
                    <label class="comp-res-filter-label">Search</label>
                    <input type="text" id="compResManageSearchInput" class="comp-res-search-input" placeholder="Search by recipient, title...">
                  </div>
                </div>

                <!-- Manage View 1: Issued Documents Table -->
                <div class="comp-res-manage-view" id="compResManageDocsView">
                  <div class="comp-res-table-wrap" id="compResManageTableWrap">
                    <!-- Loaded dynamically -->
                  </div>
                </div>

                <!-- Manage View 2: Per-User View -->
                <div class="comp-res-manage-view" id="compResManageUsersView" style="display: none;">
                  <div class="comp-res-user-picker-strip">
                    <label for="compResDossierUserSelect" style="font-size: 13px; font-weight: 600; color: var(--text-primary);">Select Learner/Employee:</label>
                    <select id="compResDossierUserSelect" class="comp-res-manage-select" style="min-width: 280px;"></select>
                  </div>
                  <div class="comp-res-user-dossier" id="compResUserDossierContent"></div>
                </div>

                <!-- Manage View 3: Access Audit Log -->
                <div class="comp-res-manage-view" id="compResManageLogsView" style="display: none;">
                  <div class="comp-res-table-wrap" id="compResManageLogsWrap"></div>
                </div>
              </div><!-- END compResPaneManage -->
            </div><!-- END companyResourcesScreenView -->"""

if old_screen_end in html:
    html = html.replace(old_screen_end, new_screen_end, 1)
    print("[OK] Added Pane 2 (My Documents) and Pane 3 (Manage) to index.html")

# 4. Modals for Personal Documents & Acknowledgement
old_modals_end = """        <div class="comp-res-preview-body" id="compDocPreviewBody">
          <!-- Loaded dynamically: iframe for PDF, img for images, or message for missing/other -->
        </div>
      </div>
    </div>"""

personal_modals = """        <div class="comp-res-preview-body" id="compDocPreviewBody">
          <!-- Loaded dynamically: iframe for PDF, img for images, or message for missing/other -->
        </div>
      </div>
    </div>

    <!-- 6. ISSUE PERSONAL DOCUMENT MODAL (ADMIN ONLY) -->
    <div class="modal-overlay" id="issuePersonalDocModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="issuePersonalModalTitle">
      <div class="modal-card comp-res-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">CONFIDENTIAL DISTRIBUTION</span>
            <h3 class="modal-title" id="issuePersonalModalTitle">Issue Personal Document</h3>
            <p class="modal-helper-text">Issued personally to one individual. Private and DPDP compliant.</p>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeIssuePersonalModalBtn" aria-label="Close dialog">&times;</button>
        </div>

        <form class="comp-res-modal-form" id="issuePersonalDocForm" novalidate>
          <div class="modal-scroll-area">
            <div class="modal-form-group">
              <label for="issuePersonalRecipient" class="modal-field-label">Recipient <span class="label-required">*</span></label>
              <div class="custom-select-wrapper">
                <select id="issuePersonalRecipient" class="modal-input-control modal-select-control" required>
                  <option value="">Select Recipient (Name &amp; Email)...</option>
                </select>
                <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="modal-grid-2col">
              <div class="modal-form-group">
                <label for="issuePersonalCategory" class="modal-field-label">Category <span class="label-required">*</span></label>
                <div class="custom-select-wrapper">
                  <select id="issuePersonalCategory" class="modal-input-control modal-select-control" required>
                    <option value="offer_letter">Offer &amp; Appointment Letter</option>
                    <option value="certificate">Certificate</option>
                    <option value="id_card">ID &amp; Access Card</option>
                    <option value="evaluation_letter">Performance &amp; Evaluation</option>
                    <option value="agreement">Agreement &amp; Declaration</option>
                    <option value="payslip">Payslip &amp; Stipend Letter</option>
                    <option value="other">Other</option>
                  </select>
                  <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div class="modal-form-group">
                <label for="issuePersonalDate" class="modal-field-label">Issue Date</label>
                <input type="date" id="issuePersonalDate" class="modal-input-control">
              </div>
            </div>

            <div class="modal-form-group">
              <label for="issuePersonalTitle" class="modal-field-label">Document Title <span class="label-required">*</span></label>
              <input type="text" id="issuePersonalTitle" class="modal-input-control" placeholder="e.g. Internship Appointment Letter - Cohort 2026" required>
            </div>

            <div class="modal-form-group">
              <label for="issuePersonalDesc" class="modal-field-label">Description / Instructions</label>
              <textarea id="issuePersonalDesc" class="modal-input-control modal-textarea-control" rows="2" placeholder="Brief note or instructions for the recipient..."></textarea>
            </div>

            <div class="modal-grid-2col">
              <div class="modal-form-group">
                <label for="issuePersonalValidUntil" class="modal-field-label">Valid Until / Expiry <span class="label-optional">(optional)</span></label>
                <input type="date" id="issuePersonalValidUntil" class="modal-input-control">
              </div>

              <div class="modal-form-group" style="display: flex; align-items: flex-end; padding-bottom: 8px;">
                <label class="comp-res-checkbox-label">
                  <input type="checkbox" id="issuePersonalRequiresAck">
                  <span>Requires recipient acknowledgement</span>
                </label>
              </div>
            </div>

            <div class="modal-form-group">
              <label for="issuePersonalFile" class="modal-field-label">Attach File <span class="label-required">*</span> <span class="label-optional">(PDF, DOCX, PNG, JPG &bull; Max 10MB)</span></label>
              <div class="comp-res-file-dropzone" id="issuePersonalDropzone">
                <input type="file" id="issuePersonalFile" class="comp-res-file-input" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" required>
                <div class="dropzone-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span class="dropzone-text" id="issuePersonalFileLabel">Choose file or drag &amp; drop</span>
                  <span class="dropzone-subtext">Max size: 10 MB</span>
                </div>
              </div>
            </div>

            <!-- Confirmation summary banner -->
            <div class="comp-res-recipient-confirmation" id="issuePersonalRecipientBanner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span id="issuePersonalSummaryText">This document will be visible only to the selected recipient.</span>
            </div>

            <div class="comp-res-progress-wrap" id="issuePersonalProgressWrap" style="display: none;">
              <div class="comp-res-progress-bar"><div class="comp-res-progress-fill" id="issuePersonalProgressFill"></div></div>
              <span class="comp-res-progress-text" id="issuePersonalProgressText">Uploading personal document...</span>
            </div>

            <div class="modal-error-alert" id="issuePersonalErrorAlert" style="display: none;"></div>
          </div>

          <div class="modal-footer">
            <button type="button" class="secondary-btn" id="cancelIssuePersonalBtn">Cancel</button>
            <button type="submit" class="primary-btn" id="submitIssuePersonalBtn">Issue Personal Document</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 7. BULK ISSUE (CSV) MODAL (ADMIN ONLY) -->
    <div class="modal-overlay" id="bulkIssueModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="bulkIssueModalTitle">
      <div class="modal-card comp-res-modal-card" style="max-width: 780px;">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">BATCH DISPATCH</span>
            <h3 class="modal-title" id="bulkIssueModalTitle">Bulk Issue Personal Documents</h3>
            <p class="modal-helper-text">Upload a CSV roster alongside attached document files for automated issuance.</p>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeBulkIssueModalBtn" aria-label="Close dialog">&times;</button>
        </div>

        <div class="comp-res-modal-form">
          <div class="modal-scroll-area">
            <div class="comp-res-csv-instructions">
              <strong>CSV Column Format:</strong>
              <code>email, title, category, issue_date, file_name, requires_acknowledgement</code>
              <p style="font-size: 11.5px; color: var(--text-muted); margin-top: 4px;">
                Categories: <code>offer_letter, certificate, id_card, evaluation_letter, agreement, payslip, other</code>
              </p>
            </div>

            <div class="modal-grid-2col" style="margin-top: 14px;">
              <div class="modal-form-group">
                <label for="bulkIssueCsvFile" class="modal-field-label">1. Select CSV File <span class="label-required">*</span></label>
                <input type="file" id="bulkIssueCsvFile" class="modal-input-control" accept=".csv">
              </div>

              <div class="modal-form-group">
                <label for="bulkIssueDocsFiles" class="modal-field-label">2. Select Document Files <span class="label-required">*</span></label>
                <input type="file" id="bulkIssueDocsFiles" class="modal-input-control" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg">
              </div>
            </div>

            <!-- Preview table -->
            <div id="bulkIssuePreviewArea" style="display: none; margin-top: 14px;">
              <span class="comp-res-history-heading">Batch Verification Preview</span>
              <div class="comp-res-table-wrap" style="max-height: 240px; overflow-y: auto;">
                <table class="comp-res-table" id="bulkIssuePreviewTable">
                  <thead>
                    <tr>
                      <th>Recipient Email</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>File Matched</th>
                      <th>Recipient Match</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="bulkIssuePreviewTbody"></tbody>
                </table>
              </div>
            </div>

            <div class="comp-res-progress-wrap" id="bulkIssueProgressWrap" style="display: none;">
              <div class="comp-res-progress-bar"><div class="comp-res-progress-fill" id="bulkIssueProgressFill"></div></div>
              <span class="comp-res-progress-text" id="bulkIssueProgressText">Processing batch...</span>
            </div>

            <div class="modal-error-alert" id="bulkIssueErrorAlert" style="display: none;"></div>
          </div>

          <div class="modal-footer">
            <button type="button" class="secondary-btn" id="cancelBulkIssueBtn">Cancel</button>
            <button type="button" class="primary-btn" id="confirmBulkIssueBtn" disabled>Issue Valid Documents</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 8. REPLACE PERSONAL FILE MODAL (ADMIN ONLY) -->
    <div class="modal-overlay" id="replacePersonalFileModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="replaceFileModalTitle">
      <div class="modal-card comp-res-confirm-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">FILE REPLACEMENT</span>
            <h3 class="modal-title" id="replaceFileModalTitle">Replace Document File</h3>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeReplaceFileModalBtn">&times;</button>
        </div>
        <form id="replacePersonalFileForm" style="padding: 16px 20px;">
          <input type="hidden" id="replaceDocId">
          <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 12px;">
            Replacing file for: <strong id="replaceDocTitleDisplay" style="color: var(--text-primary);"></strong>
          </p>
          <div class="modal-form-group">
            <label for="replaceFileNewInput" class="modal-field-label">Upload New File</label>
            <input type="file" id="replaceFileNewInput" class="modal-input-control" required accept=".pdf,.doc,.docx,.png,.jpg,.jpeg">
          </div>
          <div class="modal-footer" style="padding: 16px 0 0 0;">
            <button type="button" class="secondary-btn" id="cancelReplaceFileBtn">Cancel</button>
            <button type="submit" class="primary-btn" id="submitReplaceFileBtn">Replace File</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 9. ACKNOWLEDGEMENT CONFIRMATION MODAL -->
    <div class="modal-overlay" id="confirmAcknowledgeModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="ackModalTitle">
      <div class="modal-card comp-res-confirm-card" style="max-width: 480px;">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker" style="color: var(--accent-light);">CONFIRMATION REQUIRED</span>
            <h3 class="modal-title" id="ackModalTitle">Formal Acknowledgement</h3>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeAckModalBtn">&times;</button>
        </div>
        <div class="modal-body" style="padding: 18px 20px;">
          <p style="font-size: 14px; line-height: 1.5; color: var(--text-primary); margin-bottom: 14px;">
            You are formally acknowledging receipt and acceptance of:
            <strong id="ackDocTitleDisplay" style="display: block; margin-top: 6px; color: var(--accent-light);"></strong>
          </p>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; margin-bottom: 14px;">
            <label class="comp-res-checkbox-label">
              <input type="checkbox" id="ackCheckConfirm">
              <span style="font-size: 12.5px; line-height: 1.4;">
                I confirm that I have read, understood, and accept the provisions, terms, and conditions set forth in this document.
              </span>
            </label>
          </div>
          <p style="font-size: 11.5px; color: var(--text-muted); margin: 0;">
            Your acknowledgement timestamp and user ID will be recorded securely in the audit log.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary-btn" id="cancelAckModalBtn">Cancel</button>
          <button type="button" class="primary-btn" id="submitAckConfirmBtn" disabled>I have read and accept</button>
        </div>
      </div>
    </div>"""

if old_modals_end in html:
    html = html.replace(old_modals_end, personal_modals, 1)
    print("[OK] Added Personal Document & Acknowledgement modals to index.html")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated index.html successfully.")

