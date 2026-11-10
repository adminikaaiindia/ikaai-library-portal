# encoding: utf-8
import os
import re

print("Starting Company Resources frontend integration...")

# 1. Update index.html
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Sidebar button
sidebar_target = """            <button class="sidebar-nav-item" id="navJobDescriptions" data-screen="jds">
              <div class="nav-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span class="nav-item-text">Job Descriptions</span>
              <span class="jds-count-tag" id="sidebarJdCountBadge">11</span>
            </button>"""

sidebar_replacement = """            <button class="sidebar-nav-item" id="navJobDescriptions" data-screen="jds">
              <div class="nav-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <span class="nav-item-text">Job Descriptions</span>
              <span class="jds-count-tag" id="sidebarJdCountBadge">11</span>
            </button>

            <button class="sidebar-nav-item" id="navCompanyResources" data-screen="companyResources">
              <div class="nav-item-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span class="nav-item-text">Company Resources</span>
              <span class="jds-count-tag" id="sidebarCompanyResourcesCountBadge">0</span>
            </button>"""

if sidebar_target in html:
    html = html.replace(sidebar_target, sidebar_replacement, 1)
    print("[OK] Added sidebar Company Resources button to index.html")
else:
    print("! Sidebar target not found in index.html")

# Screen view
screen_target = """                  <div class="jd-document-body" id="jdDetailHtmlContent">
                    <!-- Full Word document content rendered here with tables & formatting -->
                  </div>
                </article>
              </div>

            </div>"""

company_resources_screen = """                  <div class="jd-document-body" id="jdDetailHtmlContent">
                    <!-- Full Word document content rendered here with tables & formatting -->
                  </div>
                </article>
              </div>

            </div>

            <!-- ==========================================
                 SCREEN 2B: COMPANY RESOURCES
                 ========================================== -->
            <div class="screen-view" id="companyResourcesScreenView">
              <!-- Top Page Header -->
              <div class="comp-res-header">
                <div class="comp-res-header-left">
                  <span class="comp-res-eyebrow">COMPANY RESOURCES</span>
                  <h1 class="comp-res-title">Company Resources</h1>
                  <p class="comp-res-subtitle">Official documents issued by Ikaai India for your programme.</p>
                </div>
                <div class="comp-res-header-actions">
                  <!-- Programme chip for interns/instructors or dropdown for admins -->
                  <div class="comp-res-prog-selector" id="compResProgSelectorArea">
                    <span class="comp-res-prog-chip" id="compResProgChip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span id="compResProgChipText">Human Resources</span>
                    </span>
                    <div class="comp-res-select-wrapper" id="compResProgSelectWrapper" style="display: none;">
                      <select class="comp-res-prog-dropdown" id="compResProgSelect" aria-label="Select Programme">
                        <option value="all">All Programmes</option>
                        <option value="10000000-0000-0000-0000-000000000001">Human Resources</option>
                        <option value="10000000-0000-0000-0000-000000000002">Data Analyst</option>
                        <option value="10000000-0000-0000-0000-000000000003">Social Research &amp; Policy</option>
                        <option value="10000000-0000-0000-0000-000000000004">Design &amp; Social Media</option>
                        <option value="10000000-0000-0000-0000-000000000005">Business Development</option>
                      </select>
                      <svg class="comp-res-select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  <!-- Admin & Instructor "Issue document" button -->
                  <button type="button" class="primary-btn comp-res-issue-btn" id="openIssueDocBtn" style="display: none;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Issue Document</span>
                  </button>
                </div>
              </div>

              <!-- Tabs: Published / Drafts (Drafts visible only to Admin/Instructor) -->
              <div class="comp-res-tabs-bar" id="compResTabsBar">
                <button type="button" class="comp-res-tab active" id="compResTabPublished" data-tab="published">
                  <span>Published Documents</span>
                  <span class="comp-res-tab-count" id="compResPublishedCount">0</span>
                </button>
                <button type="button" class="comp-res-tab" id="compResTabDrafts" data-tab="drafts" style="display: none;">
                  <span>Drafts &amp; Archive</span>
                  <span class="comp-res-tab-count" id="compResDraftsCount">0</span>
                </button>
              </div>

              <!-- Controls Toolbar: Search, Type Chips, Grid/List view toggle -->
              <div class="comp-res-toolbar">
                <div class="comp-res-search-wrap">
                  <svg class="comp-res-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" id="compResSearchInput" class="comp-res-search-input" placeholder="Search by title, description, document type..." aria-label="Search company documents">
                  <button type="button" class="comp-res-search-clear" id="compResSearchClear" style="display: none;" title="Clear search" aria-label="Clear search">&times;</button>
                </div>

                <div class="comp-res-view-toggle" role="group" aria-label="View layout toggle">
                  <button type="button" class="comp-res-toggle-btn active" id="compResViewGridBtn" title="Grid View" aria-label="Card Grid View">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button type="button" class="comp-res-toggle-btn" id="compResViewListBtn" title="List View" aria-label="List Table View">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Filter Chips by Document Type -->
              <div class="comp-res-chips-bar" id="compResTypeChipsBar">
                <button type="button" class="comp-res-chip active" data-type="all">All</button>
                <button type="button" class="comp-res-chip" data-type="policy">Policies</button>
                <button type="button" class="comp-res-chip" data-type="guideline">Guidelines</button>
                <button type="button" class="comp-res-chip" data-type="template">Templates</button>
                <button type="button" class="comp-res-chip" data-type="form">Forms</button>
                <button type="button" class="comp-res-chip" data-type="letter">Letters</button>
                <button type="button" class="comp-res-chip" data-type="report">Reports</button>
                <button type="button" class="comp-res-chip" data-type="other">Other</button>
              </div>

              <!-- Loading Skeleton -->
              <div class="comp-res-skeleton" id="compResSkeleton" style="display: none;">
                <div class="skeleton-shimmer comp-res-skel-header"></div>
                <div class="comp-res-skel-grid">
                  <div class="skeleton-shimmer comp-res-skel-card"></div>
                  <div class="skeleton-shimmer comp-res-skel-card"></div>
                  <div class="skeleton-shimmer comp-res-skel-card"></div>
                </div>
              </div>

              <!-- Main Documents Content Container -->
              <div class="comp-res-content" id="compResContent">
                <!-- Grouped sections will be rendered here dynamically -->
              </div>

              <!-- Empty State -->
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

if screen_target in html:
    html = html.replace(screen_target, company_resources_screen, 1)
    print("[OK] Added companyResourcesScreenView to index.html")
else:
    print("! Screen target not found in index.html")

# Modals
modals_target = """        <div class="modal-footer" id="cannedRepliesAdminFooter" style="display: none;">
          <button type="button" class="secondary-btn small-btn" id="addNewTemplateBtn">+ Add New Template</button>
        </div>
      </div>
    </div>"""

company_modals = """        <div class="modal-footer" id="cannedRepliesAdminFooter" style="display: none;">
          <button type="button" class="secondary-btn small-btn" id="addNewTemplateBtn">+ Add New Template</button>
        </div>
      </div>
    </div>

    <!-- ==========================================
         COMPANY RESOURCES MODALS
         ========================================== -->
    <!-- 1. ISSUE DOCUMENT MODAL -->
    <div class="modal-overlay" id="issueDocModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="issueDocModalTitle">
      <div class="modal-card comp-res-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">COMPANY RESOURCES</span>
            <h3 class="modal-title" id="issueDocModalTitle">Issue Official Document</h3>
            <p class="modal-helper-text">Upload and publish official documents, policies, templates, or reports.</p>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeIssueDocModalBtn" aria-label="Close dialog">&times;</button>
        </div>

        <form class="comp-res-modal-form" id="issueDocForm" novalidate>
          <div class="modal-scroll-area">
            <div class="modal-form-group">
              <label for="issueDocTitle" class="modal-field-label">Document Title <span class="label-required">*</span></label>
              <input type="text" id="issueDocTitle" class="modal-input-control" placeholder="e.g. Leave & Attendance Policy 2026" required>
            </div>

            <div class="modal-form-group">
              <label for="issueDocDesc" class="modal-field-label">Description / Summary</label>
              <textarea id="issueDocDesc" class="modal-input-control modal-textarea-control" rows="2" placeholder="Brief explanation of this document's scope and purpose..."></textarea>
            </div>

            <div class="modal-grid-2col">
              <div class="modal-form-group">
                <label for="issueDocType" class="modal-field-label">Document Type <span class="label-required">*</span></label>
                <div class="custom-select-wrapper">
                  <select id="issueDocType" class="modal-input-control modal-select-control" required>
                    <option value="policy">Policy</option>
                    <option value="guideline">Guideline</option>
                    <option value="template">Template</option>
                    <option value="form">Form</option>
                    <option value="letter">Letter</option>
                    <option value="report">Report</option>
                    <option value="other">Other</option>
                  </select>
                  <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div class="modal-form-group">
                <label for="issueDocProgramme" class="modal-field-label">Target Programme <span class="label-required">*</span></label>
                <div class="custom-select-wrapper">
                  <select id="issueDocProgramme" class="modal-input-control modal-select-control">
                    <option value="">All Programmes (Global)</option>
                    <option value="10000000-0000-0000-0000-000000000001">Human Resources</option>
                    <option value="10000000-0000-0000-0000-000000000002">Data Analyst</option>
                    <option value="10000000-0000-0000-0000-000000000003">Social Research &amp; Policy</option>
                    <option value="10000000-0000-0000-0000-000000000004">Design &amp; Social Media</option>
                    <option value="10000000-0000-0000-0000-000000000005">Business Development</option>
                  </select>
                  <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            <div class="modal-grid-2col">
              <div class="modal-form-group">
                <label for="issueDocVersion" class="modal-field-label">Version</label>
                <input type="text" id="issueDocVersion" class="modal-input-control" placeholder="1.0" value="1.0">
              </div>

              <div class="modal-form-group">
                <label for="issueDocDate" class="modal-field-label">Issue Date</label>
                <input type="date" id="issueDocDate" class="modal-input-control">
              </div>
            </div>

            <div class="modal-form-group">
              <label for="issueDocFile" class="modal-field-label">Attach File <span class="label-required">*</span> <span class="label-optional">(PDF, DOCX, XLSX, PPTX, PNG, JPG &bull; Max 20MB)</span></label>
              <div class="comp-res-file-dropzone" id="issueDocDropzone">
                <input type="file" id="issueDocFile" class="comp-res-file-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg">
                <div class="dropzone-inner" id="issueDocDropzoneInner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span class="dropzone-text" id="issueDocFileLabel">Choose file or drag &amp; drop here</span>
                  <span class="dropzone-subtext">Max size: 20 MB</span>
                </div>
              </div>
            </div>

            <div class="modal-form-group" style="margin-top: 10px;">
              <label class="comp-res-checkbox-label">
                <input type="checkbox" id="issueDocIsPublished" checked>
                <span>Publish immediately (visible to interns in the target programme)</span>
              </label>
            </div>

            <div class="comp-res-progress-wrap" id="issueDocProgressWrap" style="display: none;">
              <div class="comp-res-progress-bar"><div class="comp-res-progress-fill" id="issueDocProgressFill"></div></div>
              <span class="comp-res-progress-text" id="issueDocProgressText">Uploading file...</span>
            </div>

            <div class="modal-error-alert" id="issueDocErrorAlert" style="display: none;"></div>
          </div>

          <div class="modal-footer">
            <button type="button" class="secondary-btn" id="cancelIssueDocBtn">Cancel</button>
            <button type="submit" class="primary-btn" id="submitIssueDocBtn">Issue Document</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. EDIT DOCUMENT DETAILS MODAL -->
    <div class="modal-overlay" id="editDocModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="editDocModalTitle">
      <div class="modal-card comp-res-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">MANAGE DOCUMENT</span>
            <h3 class="modal-title" id="editDocModalTitle">Edit Document Details</h3>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeEditDocModalBtn" aria-label="Close dialog">&times;</button>
        </div>

        <form class="comp-res-modal-form" id="editDocForm" novalidate>
          <input type="hidden" id="editDocId">
          <div class="modal-scroll-area">
            <div class="modal-form-group">
              <label for="editDocTitle" class="modal-field-label">Document Title <span class="label-required">*</span></label>
              <input type="text" id="editDocTitle" class="modal-input-control" required>
            </div>

            <div class="modal-form-group">
              <label for="editDocDesc" class="modal-field-label">Description / Summary</label>
              <textarea id="editDocDesc" class="modal-input-control modal-textarea-control" rows="2"></textarea>
            </div>

            <div class="modal-grid-2col">
              <div class="modal-form-group">
                <label for="editDocType" class="modal-field-label">Document Type</label>
                <div class="custom-select-wrapper">
                  <select id="editDocType" class="modal-input-control modal-select-control">
                    <option value="policy">Policy</option>
                    <option value="guideline">Guideline</option>
                    <option value="template">Template</option>
                    <option value="form">Form</option>
                    <option value="letter">Letter</option>
                    <option value="report">Report</option>
                    <option value="other">Other</option>
                  </select>
                  <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div class="modal-form-group">
                <label for="editDocProgramme" class="modal-field-label">Target Programme</label>
                <div class="custom-select-wrapper">
                  <select id="editDocProgramme" class="modal-input-control modal-select-control">
                    <option value="">All Programmes (Global)</option>
                    <option value="10000000-0000-0000-0000-000000000001">Human Resources</option>
                    <option value="10000000-0000-0000-0000-000000000002">Data Analyst</option>
                    <option value="10000000-0000-0000-0000-000000000003">Social Research &amp; Policy</option>
                    <option value="10000000-0000-0000-0000-000000000004">Design &amp; Social Media</option>
                    <option value="10000000-0000-0000-0000-000000000005">Business Development</option>
                  </select>
                  <svg class="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            <div class="modal-grid-2col">
              <div class="modal-form-group">
                <label for="editDocVersion" class="modal-field-label">Version</label>
                <input type="text" id="editDocVersion" class="modal-input-control">
              </div>

              <div class="modal-form-group">
                <label for="editDocDate" class="modal-field-label">Issue Date</label>
                <input type="date" id="editDocDate" class="modal-input-control">
              </div>
            </div>

            <div class="modal-grid-2col" style="margin-top: 10px;">
              <label class="comp-res-checkbox-label">
                <input type="checkbox" id="editDocIsPublished">
                <span>Published (visible to interns)</span>
              </label>

              <label class="comp-res-checkbox-label">
                <input type="checkbox" id="editDocIsArchived">
                <span>Archived</span>
              </label>
            </div>

            <div class="modal-error-alert" id="editDocErrorAlert" style="display: none;"></div>
          </div>

          <div class="modal-footer">
            <button type="button" class="secondary-btn" id="cancelEditDocBtn">Cancel</button>
            <button type="submit" class="primary-btn" id="saveEditDocBtn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 3. UPLOAD NEW VERSION MODAL -->
    <div class="modal-overlay" id="newVersionModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="newVersionModalTitle">
      <div class="modal-card comp-res-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker">VERSION HISTORY</span>
            <h3 class="modal-title" id="newVersionModalTitle">Upload New Version</h3>
            <p class="modal-helper-text" id="newVersionDocTitle">Document: ...</p>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeNewVersionModalBtn" aria-label="Close dialog">&times;</button>
        </div>

        <form class="comp-res-modal-form" id="newVersionForm" novalidate>
          <input type="hidden" id="newVersionDocId">
          <div class="modal-scroll-area">
            <div class="modal-form-group">
              <label for="newVersionNumber" class="modal-field-label">New Version String <span class="label-required">*</span></label>
              <input type="text" id="newVersionNumber" class="modal-input-control" placeholder="e.g. 2.0 or 1.1" required>
            </div>

            <div class="modal-form-group">
              <label for="newVersionChangelog" class="modal-field-label">Change Summary / Notes</label>
              <textarea id="newVersionChangelog" class="modal-input-control modal-textarea-control" rows="2" placeholder="What changed in this revision? (e.g. Updated Section 4.2 for new FY policy)"></textarea>
            </div>

            <div class="modal-form-group">
              <label for="newVersionFile" class="modal-field-label">New File <span class="label-required">*</span></label>
              <div class="comp-res-file-dropzone" id="newVersionDropzone">
                <input type="file" id="newVersionFile" class="comp-res-file-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg" required>
                <div class="dropzone-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span class="dropzone-text" id="newVersionFileLabel">Choose file or drag &amp; drop</span>
                  <span class="dropzone-subtext">Max size: 20 MB</span>
                </div>
              </div>
            </div>

            <!-- Version History List -->
            <div class="comp-res-history-box" id="newVersionHistoryBox" style="display: none;">
              <span class="comp-res-history-heading">Previous Versions</span>
              <div class="comp-res-history-list" id="newVersionHistoryList"></div>
            </div>

            <div class="comp-res-progress-wrap" id="newVersionProgressWrap" style="display: none;">
              <div class="comp-res-progress-bar"><div class="comp-res-progress-fill" id="newVersionProgressFill"></div></div>
              <span class="comp-res-progress-text" id="newVersionProgressText">Uploading version...</span>
            </div>

            <div class="modal-error-alert" id="newVersionErrorAlert" style="display: none;"></div>
          </div>

          <div class="modal-footer">
            <button type="button" class="secondary-btn" id="cancelNewVersionBtn">Cancel</button>
            <button type="submit" class="primary-btn" id="submitNewVersionBtn">Upload Version</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 4. DELETE DOCUMENT CONFIRMATION MODAL -->
    <div class="modal-overlay" id="deleteDocConfirmModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="deleteDocConfirmTitle">
      <div class="modal-card comp-res-confirm-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="modal-kicker" style="color: #ff5c7c;">CONFIRM DELETION</span>
            <h3 class="modal-title" id="deleteDocConfirmTitle">Delete Document</h3>
          </div>
          <button type="button" class="icon-btn close-modal-btn" id="closeDeleteDocModalBtn" aria-label="Close dialog">&times;</button>
        </div>
        <div class="modal-body" style="padding: 16px 20px;">
          <p style="font-size: 14px; line-height: 1.5; color: var(--text-secondary);">
            Are you sure you want to permanently delete <strong id="deleteDocName" style="color: var(--text-primary);"></strong>?
            This document, its versions, and its download records will be removed.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary-btn" id="cancelDeleteDocBtn">Cancel</button>
          <button type="button" class="primary-btn" id="confirmDeleteDocBtn" style="background: #e11d48; border-color: #be123c;">Delete Document</button>
        </div>
      </div>
    </div>

    <!-- 5. DOCUMENT PREVIEW MODAL -->
    <div class="modal-overlay" id="compDocPreviewModal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="compDocPreviewTitle">
      <div class="modal-card comp-res-preview-card">
        <div class="modal-header comp-res-preview-header">
          <div class="comp-res-preview-title-group">
            <span class="comp-res-preview-badge" id="compDocPreviewTypeBadge">PDF</span>
            <h3 class="modal-title comp-res-preview-title" id="compDocPreviewTitle">Document Preview</h3>
            <span class="comp-res-preview-ver" id="compDocPreviewVer">v1.0</span>
          </div>
          <div class="comp-res-preview-actions">
            <button type="button" class="primary-btn small-btn" id="compDocPreviewDownloadBtn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download</span>
            </button>
            <button type="button" class="icon-btn close-modal-btn" id="closeCompDocPreviewBtn" aria-label="Close preview">&times;</button>
          </div>
        </div>

        <div class="comp-res-preview-body" id="compDocPreviewBody">
          <!-- Loaded dynamically: iframe for PDF, img for images, or message for missing/other -->
        </div>
      </div>
    </div>"""

if modals_target in html:
    html = html.replace(modals_target, company_modals, 1)
    print("[OK] Added Company Resources modals to index.html")
else:
    print("! Modals target not found in index.html")

# Bump cache buster in script and link tags
html = html.replace("v=20261103_v15", "v=20261105_v16")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated index.html successfully.")
