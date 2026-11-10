# encoding: utf-8
with open("styles.css", "a", encoding="utf-8") as f:
    f.write("""

/* ==========================================================================
   PERSONAL DOCUMENTS & MANAGE TAB (DPDP COMPLIANT)
   ========================================================================== */
.comp-res-main-tabs {
  display: flex;
  gap: 12px;
  border-bottom: 2px solid var(--border-subtle);
  margin-bottom: 24px;
  overflow-x: auto;
}

.comp-res-main-tab {
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 12px 20px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
  white-space: nowrap;
  margin-bottom: -2px;
}

.comp-res-main-tab:hover {
  color: var(--text-primary);
}

.comp-res-main-tab.active {
  color: var(--accent-light);
  border-bottom-color: var(--accent-primary);
}

[data-theme="light"] .comp-res-main-tab.active {
  color: #007a32;
  border-bottom-color: var(--accent-primary);
}

/* Privacy Notice Banner */
.comp-res-privacy-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.25);
  border-radius: var(--radius-md);
  padding: 12px 18px;
  margin-bottom: 22px;
}

[data-theme="light"] .comp-res-privacy-banner {
  background: rgba(99, 102, 241, 0.05);
  border-color: rgba(99, 102, 241, 0.2);
}

.comp-res-privacy-icon {
  color: #818cf8;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comp-res-privacy-text {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.comp-res-privacy-text strong {
  color: var(--text-primary);
  margin-right: 4px;
}

/* Status Badges */
.badge-action-required {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

[data-theme="light"] .badge-action-required {
  background: rgba(245, 158, 11, 0.12);
  color: #b45309;
}

.badge-acknowledged {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(0, 165, 68, 0.15);
  color: var(--accent-light);
  border: 1px solid rgba(0, 165, 68, 0.35);
  text-transform: uppercase;
}

[data-theme="light"] .badge-acknowledged {
  background: rgba(0, 165, 68, 0.1);
  color: #007a32;
}

.badge-revoked {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);
  text-transform: uppercase;
}

/* Acknowledgement Banner Inside Personal Card */
.comp-res-ack-card-banner {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
}

.comp-res-ack-card-text {
  font-size: 12px;
  font-weight: 600;
  color: #fbbf24;
  display: flex;
  align-items: center;
  gap: 6px;
}

[data-theme="light"] .comp-res-ack-card-text {
  color: #b45309;
}

.comp-res-ack-action-btn {
  background: #f59e0b;
  color: #ffffff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 5px 12px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;
}

.comp-res-ack-action-btn:hover {
  background: #d97706;
}

/* Admin Manage View */
.comp-res-manage-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.comp-res-manage-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.comp-res-manage-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.comp-res-manage-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.comp-res-manage-filters {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 14px;
}

.comp-res-filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.comp-res-filter-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.comp-res-manage-select {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  padding: 8px 12px;
  font-size: 12.5px;
  outline: none;
  cursor: pointer;
}

.comp-res-user-picker-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  background: var(--bg-card);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.comp-res-recipient-confirmation {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 165, 68, 0.08);
  border: 1px solid rgba(0, 165, 68, 0.25);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  font-size: 12.5px;
  color: var(--accent-light);
  margin-top: 10px;
}

[data-theme="light"] .comp-res-recipient-confirmation {
  color: #007a32;
  background: rgba(0, 165, 68, 0.05);
}

.comp-res-csv-instructions {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 12.5px;
  color: var(--text-secondary);
}

.comp-res-csv-instructions code {
  display: block;
  background: rgba(255, 255, 255, 0.06);
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  margin-top: 6px;
  color: var(--accent-light);
  overflow-x: auto;
}

[data-theme="light"] .comp-res-csv-instructions code {
  background: rgba(0, 0, 0, 0.06);
  color: #007a32;
}
""")

print("Successfully added personal documents CSS styles to styles.css")

