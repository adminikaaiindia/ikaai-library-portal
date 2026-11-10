gate_and_admin_css = """
/* ==========================================================================
   ACCESS CONTROL & GATING SCREENS (PENDING / REVOKED) & ADMIN MANAGEMENT
   ========================================================================== */

.full-gate-screen {
  position: fixed;
  inset: 0;
  z-index: 600;
  background-color: var(--bg-main, #0b0c10);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow-y: auto;
}

.gate-card {
  background: var(--bg-card, #12141a);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  border-radius: 18px;
  max-width: 520px;
  width: 100%;
  padding: 40px 32px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gate-brand-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.gate-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.gate-icon-circle.pending {
  background: rgba(245, 158, 11, 0.12);
  border: 2px solid rgba(245, 158, 11, 0.35);
  color: #f59e0b;
}

.gate-icon-circle.revoked {
  background: rgba(239, 68, 68, 0.12);
  border: 2px solid rgba(239, 68, 68, 0.35);
  color: #ef4444;
}

.gate-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.25;
}

.gate-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 20px;
  max-width: 440px;
}

.gate-email-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 22px;
  word-break: break-all;
}

.gate-info-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 13px;
  color: var(--text-secondary);
  text-align: left;
  line-height: 1.55;
  margin-bottom: 28px;
  width: 100%;
}

.gate-actions {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

/* Admin Access & Invites Elements */
.admin-pending-alert {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.admin-pending-alert-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.admin-invite-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 24px;
}

.admin-tab-nav {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.admin-tab-nav-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.admin-tab-nav-btn.active {
  background: rgba(0, 165, 68, 0.12);
  border-color: rgba(0, 165, 68, 0.3);
  color: var(--accent-light, #00d659);
}

.badge-status-active {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(0, 165, 68, 0.15);
  border: 1px solid rgba(0, 165, 68, 0.35);
  color: var(--accent-light, #00d659);
  font-size: 11.5px;
  font-weight: 700;
}

.badge-status-pending {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.35);
  color: #f59e0b;
  font-size: 11.5px;
  font-weight: 700;
}

.badge-status-invited {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.35);
  color: #60a5fa;
  font-size: 11.5px;
  font-weight: 700;
}

.badge-status-revoked {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #f87171;
  font-size: 11.5px;
  font-weight: 700;
}

.bulk-preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
  margin-top: 14px;
}

.bulk-preview-table th,
.bulk-preview-table td {
  padding: 8px 12px;
  border: 1px solid var(--border-subtle);
  text-align: left;
}

.bulk-preview-table th {
  background: rgba(255, 255, 255, 0.03);
  font-weight: 600;
  color: var(--text-secondary);
}
"""

with open("styles.css", "a", encoding="utf-8") as f:
    f.write(gate_and_admin_css)

print("Appended gate and admin CSS to styles.css successfully.")

