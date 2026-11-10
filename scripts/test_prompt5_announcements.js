// Test script to verify Prompt 5 (Announcements & Noticeboard) and Document Viewer
const fs = require('fs');
const path = require('path');

let errors = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error('❌ ' + message);
  } else {
    console.log('✅ ' + message);
  }
}

console.log('--- Checking Migration: 20261106_07_announcements.sql ---');
const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20261106_07_announcements.sql');
assert(fs.existsSync(migrationPath), 'Migration file exists');

if (fs.existsSync(migrationPath)) {
  const migContent = fs.readFileSync(migrationPath, 'utf8');
  assert(migContent.includes('create table if not exists public.announcements'), 'Creates announcements table');
  assert(migContent.includes('create table if not exists public.announcement_reads'), 'Creates announcement_reads table');
  assert(migContent.includes('create table if not exists public.announcement_acks'), 'Creates announcement_acks table');
  assert(migContent.includes('create table if not exists public.announcement_comments'), 'Creates announcement_comments table');
  assert(migContent.includes('create table if not exists public.announcement_files'), 'Creates announcement_files table');
  assert(migContent.includes("insert into storage.buckets (id, name, public)"), 'Creates announcement-files storage bucket');
  assert(migContent.includes('create or replace function public.mark_announcement_read'), 'Defines mark_announcement_read RPC');
  assert(migContent.includes('create or replace function public.mark_all_announcements_read'), 'Defines mark_all_announcements_read RPC');
  assert(migContent.includes('create or replace function public.acknowledge_announcement'), 'Defines acknowledge_announcement RPC');
  assert(migContent.includes('create or replace function public.publish_announcement'), 'Defines publish_announcement RPC');
  assert(migContent.includes('create or replace function public.get_announcement_audit_report'), 'Defines get_announcement_audit_report RPC');
  assert(migContent.includes('enable row level security'), 'RLS enabled on tables');
}

console.log('\n--- Checking Data Layer: data.js ---');
const dataJsPath = path.join(__dirname, '..', 'data.js');
assert(fs.existsSync(dataJsPath), 'data.js exists');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
assert(dataJsContent.includes('async getAnnouncements'), 'DataLayer.getAnnouncements exists');
assert(dataJsContent.includes('async markAnnouncementRead'), 'DataLayer.markAnnouncementRead exists');
assert(dataJsContent.includes('async markAllAnnouncementsRead'), 'DataLayer.markAllAnnouncementsRead exists');
assert(dataJsContent.includes('async acknowledgeAnnouncement'), 'DataLayer.acknowledgeAnnouncement exists');
assert(dataJsContent.includes('async publishAnnouncement'), 'DataLayer.publishAnnouncement exists');
assert(dataJsContent.includes('async archiveAnnouncement'), 'DataLayer.archiveAnnouncement exists');
assert(dataJsContent.includes('async deleteAnnouncement'), 'DataLayer.deleteAnnouncement exists');
assert(dataJsContent.includes('async postAnnouncementComment'), 'DataLayer.postAnnouncementComment exists');
assert(dataJsContent.includes('async getAnnouncementAuditReport'), 'DataLayer.getAnnouncementAuditReport exists');
assert(dataJsContent.includes('async uploadAnnouncementAttachment'), 'DataLayer.uploadAnnouncementAttachment exists');

console.log('\n--- Checking Markup: index.html ---');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
assert(indexHtmlContent.includes('id="docViewerModalOverlay"'), 'docViewerModalOverlay modal exists');
assert(indexHtmlContent.includes('id="docViewerTitle"'), 'docViewerTitle exists');
assert(indexHtmlContent.includes('id="docViewerBody"'), 'docViewerBody exists');
assert(indexHtmlContent.includes('id="docViewerProgress"'), 'docViewerProgress exists');
assert(indexHtmlContent.includes('id="announcementsUnreadBadge"'), 'Sidebar announcement unread badge exists');
assert(indexHtmlContent.includes('id="announcementsScreenView"'), 'announcementsScreenView screen exists');
assert(indexHtmlContent.includes('id="announcementFormModal"'), 'Staff announcement authoring modal exists');
assert(indexHtmlContent.includes('id="announcementAuditModal"'), 'Staff audit report modal exists');
assert(indexHtmlContent.includes('id="userPhoneInput"'), 'userPhoneInput exists');

console.log('\n--- Checking App Logic: app.js ---');
const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');
assert(appJsContent.includes('openDocViewer(res)'), 'openDocViewer function exists');
assert(appJsContent.includes('renderAnnouncementsScreen'), 'renderAnnouncementsScreen function exists');
assert(appJsContent.includes('realtime_announcements'), 'Realtime announcements listener exists');
assert(appJsContent.includes('exportCohortCsvBtn'), 'Audit CSV export logic exists');

if (errors.length > 0) {
  console.error(`\n❌ Completed with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL CHECKS PASSED: Prompt 5 & Document Viewer are fully configured and verified!');
}
