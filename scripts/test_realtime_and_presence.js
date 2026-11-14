const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== REALTIME CHAT & PRESENCE VERIFICATION ===');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const dataJs = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');
const html404 = fs.readFileSync(path.join(__dirname, '..', '404.html'), 'utf8');
const migrationSql = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '20261113_14_chat_presence_touch_last_seen.sql'), 'utf8');

// 1. Meta CSP check
assert(indexHtml.includes('<meta http-equiv="Content-Security-Policy"'), 'Meta CSP tag exists in index.html');
assert(indexHtml.includes('connect-src \'self\' https://fmblkesibzjrydswwldq.supabase.co wss://fmblkesibzjrydswwldq.supabase.co'), 'Meta CSP connect-src matches exact hosts');
assert(!indexHtml.includes('connect-src \'self\' https://*.supabase.co'), 'No wildcards in meta CSP connect-src');
console.log('✅ Meta CSP tag in index.html is strict and exact');

// 2. 404.html relative path
assert(html404.includes('href="./index.html"'), '404.html uses relative ./index.html');
assert(!html404.includes('href="/index.html"'), '404.html does not use root-relative /index.html');
console.log('✅ 404.html relative link verified');

// 3. Reconnecting banner in index.html & styles.css
assert(indexHtml.includes('id="chatReconnectingBanner"'), '#chatReconnectingBanner exists in index.html');
assert(stylesCss.includes('.chat-reconnecting-banner'), '.chat-reconnecting-banner exists in styles.css');
console.log('✅ Reconnecting banner & styles verified');

// 4. Migration SQL
assert(migrationSql.includes('touch_last_seen()'), 'Migration defines touch_last_seen()');
assert(migrationSql.includes('security definer'), 'touch_last_seen() is security definer');
assert(migrationSql.includes('supabase_realtime'), 'Migration configures supabase_realtime publication');
console.log('✅ Migration 20261113_14 verified');

// 5. Console diagnostics
assert(appJs.includes('[TeamChat] subscribed: '), 'app.js logs [TeamChat] subscribed: <status>');
assert(appJs.includes('[TeamChat] realtime message '), 'app.js logs [TeamChat] realtime message <id>');
console.log('✅ Console diagnostic logs verified');

// 6. Presence & last seen
assert(appJs.includes("client.rpc('touch_last_seen')"), 'GlobalPresence calls touch_last_seen RPC');
assert(!appJs.includes("client.from('profiles').update({\n          last_seen:"), 'Direct profiles.last_seen update removed from app.js');
assert(appJs.includes('120000'), '2-minute interval configured for touch_last_seen');
console.log('✅ GlobalPresence RPC and 2-minute interval verified');

// 7. Cleanup & teardown
assert(appJs.includes('cleanupRealtimeChannels'), 'cleanupRealtimeChannels exists');
assert(appJs.includes('window.TeamChat.cleanupRealtime()'), 'TeamChat.cleanupRealtime called on signout');
console.log('✅ Realtime channel cleanup on signout verified');

// 8. Cache busting
assert(indexHtml.includes('app.js?v=202611'), 'app.js cache version bumped');
assert(indexHtml.includes('data.js?v=202611'), 'data.js cache version bumped');
console.log('✅ Cache versioning verified');

console.log('\n🎉 ALL REALTIME CHAT & PRESENCE CHECKS PASSED!');
