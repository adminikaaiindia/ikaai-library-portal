const fs = require('fs');
const assert = require('assert');

console.log('Testing Chat Details & Add Member fixes...');

// 1. Check index.html
const html = fs.readFileSync('index.html', 'utf-8');

// Check custom-select-wrapper around detailsMuteSelect
assert(
  html.includes('id="detailsMuteSelect"') && html.includes('id="detailsNotifyPrefSelect"'),
  'Mute and Notification select elements must exist'
);

const muteWrapperMatch = html.match(/<div class="custom-select-wrapper">\s*<select id="detailsMuteSelect"[\s\S]*?<svg class="select-chevron"/);
assert(muteWrapperMatch, 'detailsMuteSelect must be wrapped in custom-select-wrapper with select-chevron SVG');

const notifyWrapperMatch = html.match(/<div class="custom-select-wrapper">\s*<select id="detailsNotifyPrefSelect"[\s\S]*?<svg class="select-chevron"/);
assert(notifyWrapperMatch, 'detailsNotifyPrefSelect must be wrapped in custom-select-wrapper with select-chevron SVG');

// Check chatAddMemberModal
assert(html.includes('id="chatAddMemberModal"'), 'chatAddMemberModal must exist in index.html');
assert(html.includes('id="chatAddMemberSearchInput"'), 'chatAddMemberSearchInput must exist');
assert(html.includes('id="chatAddMemberSelectedChips"'), 'chatAddMemberSelectedChips must exist');
assert(html.includes('id="chatAddMemberUserList"'), 'chatAddMemberUserList must exist');
assert(html.includes('id="confirmChatAddMemberBtn"'), 'confirmChatAddMemberBtn must exist');

// 2. Check styles.css
const css = fs.readFileSync('styles.css', 'utf-8');
assert(css.includes('.details-setting-field .select-chevron'), 'CSS must define .details-setting-field .select-chevron');
assert(css.includes('padding: 0 34px 0 12px'), 'Small select must have padding to accommodate right chevron');

// 3. Check app.js
const js = fs.readFileSync('app.js', 'utf-8');
assert(js.includes('function openAddMemberModal'), 'openAddMemberModal must be defined in app.js');
assert(js.includes('function confirmAddMembersToGroup'), 'confirmAddMembersToGroup must be defined in app.js');
assert(js.includes('closeChatAddMemberModalBtn'), 'Add member modal close button must be wired');
assert(js.includes('detailsMuteSelect'), 'detailsMuteSelect must be wired in renderDetailsPanel');
assert(js.includes('detailsNotifyPrefSelect'), 'detailsNotifyPrefSelect must be wired in renderDetailsPanel');

console.log('ALL VERIFICATION CHECKS PASSED!');

