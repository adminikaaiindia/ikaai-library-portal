# encoding: utf-8
with open("styles.css", "a", encoding="utf-8") as f:
    f.write("""

/* ==========================================================================
   COMPANY RESOURCES (ROLES & REPOSITORIES)
   ========================================================================== */
.comp-res-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.comp-res-header-left {
  flex: 1;
  min-width: 260px;
}

.comp-res-eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--accent-light);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.comp-res-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 6px 0;
  line-height: 1.2;
}

.comp-res-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.comp-res-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.comp-res-prog-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(0, 165, 68, 0.12);
  border: 1px solid rgba(0, 165, 68, 0.3);
  border-radius: 9999px;
  color: var(--accent-light);
  font-size: 13px;
  font-weight: 600;
}

[data-theme="light"] .comp-res-prog-chip {
  background: rgba(0, 165, 68, 0.08);
  border-color: rgba(0, 165, 68, 0.25);
  color: #007a32;
}

.comp-res-select-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.comp-res-prog-dropdown {
  appearance: none;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  padding: 8px 32px 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.2s;
}

.comp-res-prog-dropdown:focus {
  border-color: var(--border-accent);
  outline: none;
}

.comp-res-select-chevron {
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: var(--text-secondary);
}

.comp-res-issue-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: var(--radius-md);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: var(--accent-primary);
  color: #ffffff;
  transition: background 0.2s ease, transform 0.15s ease;
}

.comp-res-issue-btn:hover {
  background: var(--accent-primary-hover);
  transform: translateY(-1px);
}

/* Tabs Bar */
.comp-res-tabs-bar {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 20px;
}

.comp-res-tab {
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.comp-res-tab:hover {
  color: var(--text-primary);
}

.comp-res-tab.active {
  color: var(--accent-light);
  border-bottom-color: var(--accent-primary);
}

[data-theme="light"] .comp-res-tab.active {
  color: #007a32;
  border-bottom-color: var(--accent-primary);
}

.comp-res-tab-count {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

[data-theme="light"] .comp-res-tab-count {
  background: rgba(0, 0, 0, 0.08);
  color: var(--text-primary);
}

/* Toolbar */
.comp-res-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.comp-res-search-wrap {
  position: relative;
  flex: 1;
  min-width: 260px;
  max-width: 520px;
}

.comp-res-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.comp-res-search-input {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 9px 36px 9px 38px;
  color: var(--text-primary);
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.comp-res-search-input:focus {
  border-color: var(--border-accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.comp-res-search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
}

.comp-res-view-toggle {
  display: inline-flex;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 3px;
  gap: 3px;
}

.comp-res-toggle-btn {
  background: transparent;
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.comp-res-toggle-btn:hover {
  color: var(--text-primary);
}

.comp-res-toggle-btn.active {
  background: var(--accent-primary);
  color: #ffffff;
}

/* Filter Chips */
.comp-res-chips-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 24px;
  scrollbar-width: thin;
}

.comp-res-chip {
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12.5px;
  font-weight: 500;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.comp-res-chip:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.comp-res-chip.active {
  background: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
  font-weight: 600;
}

/* Grouped Sections */
.comp-res-section {
  margin-bottom: 32px;
}

.comp-res-section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-subtle);
}

.comp-res-section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: capitalize;
  margin: 0;
}

.comp-res-section-count {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
  background: rgba(0, 165, 68, 0.15);
  color: var(--accent-light);
}

[data-theme="light"] .comp-res-section-count {
  color: #007a32;
  background: rgba(0, 165, 68, 0.1);
}

/* Card Grid Layout */
.comp-res-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.comp-res-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.comp-res-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-accent);
  box-shadow: var(--shadow-card);
}

.comp-res-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.comp-res-file-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.comp-res-icon-pdf {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.comp-res-icon-doc {
  background: rgba(59, 130, 246, 0.12);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.25);
}

.comp-res-icon-xls {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.comp-res-icon-ppt {
  background: rgba(249, 115, 22, 0.12);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.25);
}

.comp-res-icon-img {
  background: rgba(168, 85, 247, 0.12);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.comp-res-icon-other {
  background: rgba(148, 163, 184, 0.12);
  color: #94a3b8;
  border: 1px solid rgba(148, 163, 184, 0.25);
}

.comp-res-card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
  align-items: center;
}

/* Badges */
.badge-new {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(0, 165, 68, 0.2);
  color: var(--accent-light);
  border: 1px solid rgba(0, 165, 68, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

[data-theme="light"] .badge-new {
  color: #007a32;
  background: rgba(0, 165, 68, 0.12);
}

.badge-updated {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(6, 182, 212, 0.2);
  color: #22d3ee;
  border: 1px solid rgba(6, 182, 212, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

[data-theme="light"] .badge-updated {
  color: #0891b2;
  background: rgba(6, 182, 212, 0.12);
}

.badge-draft {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.4);
  text-transform: uppercase;
}

[data-theme="light"] .badge-draft {
  color: #d97706;
  background: rgba(245, 158, 11, 0.12);
}

.badge-archived {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
  border: 1px solid rgba(148, 163, 184, 0.4);
  text-transform: uppercase;
}

.badge-all-prog {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(99, 102, 241, 0.15);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

[data-theme="light"] .badge-all-prog {
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.1);
}

.badge-prog {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
}

[data-theme="light"] .badge-prog {
  background: rgba(0, 0, 0, 0.05);
}

.badge-doc-type {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(0, 165, 68, 0.1);
  color: var(--accent-light);
  text-transform: capitalize;
}

[data-theme="light"] .badge-doc-type {
  color: #007a32;
}

.badge-version {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-surface);
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
}

/* Card Content */
.comp-res-card-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comp-res-card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.comp-res-card-desc {
  font-size: 12.5px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.comp-res-card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11.5px;
  color: var(--text-muted);
}

.comp-res-card-meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-muted);
}

/* Card Actions */
.comp-res-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}

.comp-res-card-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.comp-res-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.comp-res-btn-preview {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.comp-res-btn-preview:hover {
  border-color: var(--border-accent);
  color: var(--accent-light);
}

.comp-res-btn-download {
  background: rgba(0, 165, 68, 0.12);
  color: var(--accent-light);
  border: 1px solid rgba(0, 165, 68, 0.3);
}

[data-theme="light"] .comp-res-btn-download {
  color: #007a32;
  border-color: rgba(0, 165, 68, 0.25);
}

.comp-res-btn-download:hover {
  background: var(--accent-primary);
  color: #ffffff;
  border-color: var(--accent-primary);
}

/* Admin/Instructor Dropdown Menu */
.comp-res-admin-actions {
  position: relative;
  display: inline-block;
}

.comp-res-menu-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comp-res-menu-btn:hover {
  color: var(--text-primary);
  background: var(--bg-surface);
}

.comp-res-dropdown-menu {
  position: absolute;
  right: 0;
  bottom: calc(100% + 4px);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  min-width: 170px;
  z-index: 100;
  display: none;
  padding: 4px 0;
}

.comp-res-dropdown-menu.active {
  display: block;
}

.comp-res-menu-item {
  width: 100%;
  text-align: left;
  padding: 8px 14px;
  font-size: 12.5px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s ease;
}

.comp-res-menu-item:hover {
  background: var(--bg-card-hover);
  color: var(--accent-light);
}

.comp-res-menu-item.danger {
  color: #ff5c7c;
}

.comp-res-menu-item.danger:hover {
  background: rgba(255, 92, 124, 0.1);
  color: #ff5c7c;
}

.comp-res-download-stat {
  font-size: 11px;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* List / Table View */
.comp-res-table-wrap {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  margin-bottom: 24px;
}

.comp-res-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

.comp-res-table th {
  padding: 12px 16px;
  background: var(--bg-surface);
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-subtle);
  white-space: nowrap;
}

.comp-res-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
  color: var(--text-primary);
}

.comp-res-table tbody tr:hover {
  background: var(--bg-card-hover);
}

.comp-res-table tbody tr:last-child td {
  border-bottom: none;
}

/* Modals & Dropzones */
.comp-res-modal-card {
  max-width: 580px;
  width: 95%;
}

.comp-res-confirm-card {
  max-width: 440px;
  width: 95%;
}

.comp-res-file-dropzone {
  position: relative;
  border: 2px dashed var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background: var(--bg-surface);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.comp-res-file-dropzone:hover {
  border-color: var(--border-accent);
  background: var(--bg-card-hover);
}

.comp-res-file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.dropzone-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  pointer-events: none;
}

.dropzone-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.dropzone-subtext {
  font-size: 11.5px;
  color: var(--text-muted);
}

.comp-res-checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-primary);
  cursor: pointer;
}

.comp-res-checkbox-label input[type="checkbox"] {
  accent-color: var(--accent-primary);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.comp-res-progress-wrap {
  margin-top: 14px;
}

.comp-res-progress-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-surface);
  border-radius: 9999px;
  overflow: hidden;
}

.comp-res-progress-fill {
  width: 0%;
  height: 100%;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

.comp-res-progress-text {
  display: block;
  font-size: 11.5px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.comp-res-history-box {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px;
  margin-top: 14px;
}

.comp-res-history-heading {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.comp-res-history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 12px;
}

.comp-res-history-item:last-child {
  border-bottom: none;
}

/* Document Preview Modal */
.comp-res-preview-card {
  max-width: 960px;
  width: 95%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.comp-res-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-card);
}

.comp-res-preview-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}

.comp-res-preview-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(0, 165, 68, 0.15);
  color: var(--accent-light);
  text-transform: uppercase;
  flex-shrink: 0;
}

.comp-res-preview-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comp-res-preview-ver {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--bg-surface);
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
  flex-shrink: 0;
}

.comp-res-preview-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.comp-res-preview-body {
  flex: 1;
  background: #090b0e;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

[data-theme="light"] .comp-res-preview-body {
  background: #f1f5f9;
}

.comp-res-preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.comp-res-preview-img {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.comp-res-missing-file-alert {
  padding: 36px 24px;
  text-align: center;
  max-width: 440px;
}

.comp-res-missing-icon {
  margin-bottom: 12px;
  color: #f59e0b;
}

.comp-res-missing-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.comp-res-missing-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 16px 0;
}

/* Skeleton & Empty State */
.comp-res-skel-header {
  height: 24px;
  width: 200px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.comp-res-skel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.comp-res-skel-card {
  height: 180px;
  border-radius: var(--radius-lg);
}

.comp-res-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--bg-card);
  border: 1px dashed var(--border-subtle);
  border-radius: var(--radius-lg);
  margin-top: 16px;
}

.comp-res-empty-icon {
  margin-bottom: 16px;
  color: var(--text-muted);
}

.comp-res-empty-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px 0;
}

.comp-res-empty-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .comp-res-header {
    flex-direction: column;
    align-items: stretch;
  }
  .comp-res-header-actions {
    justify-content: space-between;
  }
  .comp-res-grid {
    grid-template-columns: 1fr;
  }
  .comp-res-search-wrap {
    max-width: 100%;
  }
}
""")

print("Successfully added Company Resources styles to styles.css")

