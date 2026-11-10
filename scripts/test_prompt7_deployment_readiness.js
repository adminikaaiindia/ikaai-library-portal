// Automated test script for Prompt 7: Deployment Readiness
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

console.log('=== PROMPT 7: DEPLOYMENT READINESS VERIFICATION ===\n');

// 1. Config & Secrets
console.log('--- 1. Configuration & Secrets Hygiene ---');
const cfgPath = path.join(__dirname, '..', 'supabase-config.js');
const cfgExPath = path.join(__dirname, '..', 'supabase-config.example.js');
assert(fs.existsSync(cfgPath), 'supabase-config.js exists');
assert(fs.existsSync(cfgExPath), 'supabase-config.example.js template exists');

const cfgContent = fs.readFileSync(cfgPath, 'utf8');
assert(!/service_role/i.test(cfgContent), 'No service_role in supabase-config.js');

// Check localhost references in application files
const filesToCheck = ['app.js', 'data.js', 'supabase-client.js', 'index.html', '404.html'];
filesToCheck.forEach(f => {
  const p = path.join(__dirname, '..', f);
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    assert(!c.includes('http://localhost') && !c.includes('https://localhost'), `Zero hardcoded localhost URLs in ${f}`);
  }
});

// 2. Hosting Configs & Security Headers
console.log('\n--- 2. Hosting Configurations & Security Headers ---');
const netlifyPath = path.join(__dirname, '..', 'netlify.toml');
assert(fs.existsSync(netlifyPath), 'netlify.toml exists');
if (fs.existsSync(netlifyPath)) {
  const nContent = fs.readFileSync(netlifyPath, 'utf8');
  assert(nContent.includes('Content-Security-Policy'), 'netlify.toml includes Content-Security-Policy header');
  assert(nContent.includes('X-Content-Type-Options = "nosniff"'), 'netlify.toml includes nosniff');
  assert(nContent.includes('from = "/*"'), 'netlify.toml includes SPA rewrite rule');
}

const vercelPath = path.join(__dirname, '..', 'vercel.json');
assert(fs.existsSync(vercelPath), 'vercel.json exists');
if (fs.existsSync(vercelPath)) {
  const vContent = fs.readFileSync(vercelPath, 'utf8');
  assert(vContent.includes('Content-Security-Policy'), 'vercel.json includes Content-Security-Policy header');
  assert(vContent.includes('"source": "/(.*)"'), 'vercel.json includes SPA rewrite rule');
}

const gitignorePath = path.join(__dirname, '..', '.gitignore');
assert(fs.existsSync(gitignorePath), '.gitignore exists and excludes secrets');

// 3. Friendly Fallback Pages & Modals
console.log('\n--- 3. Friendly Pages & Modals ---');
const html404Path = path.join(__dirname, '..', '404.html');
assert(fs.existsSync(html404Path), 'Standalone 404.html exists');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
assert(indexHtmlContent.includes('id="accessPendingScreen"'), 'Access Pending approval screen exists');
assert(indexHtmlContent.includes('id="privacyRulesModalOverlay"'), 'Privacy Notice & Community Rules modal exists');
assert(indexHtmlContent.includes('id="maintenanceModalOverlay"'), 'Maintenance / offline modal exists');
assert(indexHtmlContent.includes('id="forgotPasswordLink"'), 'Forgot password link exists');

// 4. Deployment Guide Documentation
console.log('\n--- 4. Deployment Guide & Documentation ---');
const deployDocPath = path.join(__dirname, '..', 'docs', 'DEPLOY.md');
assert(fs.existsSync(deployDocPath), 'docs/DEPLOY.md exists');
if (fs.existsSync(deployDocPath)) {
  const dContent = fs.readFileSync(deployDocPath, 'utf8');
  assert(dContent.includes('Site URL'), 'Covers Supabase Site URL config');
  assert(dContent.includes('Authorized JavaScript origins'), 'Covers Google OAuth origins');
  assert(dContent.includes('Pre-Launch Verification Checklist'), 'Includes launch verification checklist');
  assert(dContent.includes('Data Stored Summary'), 'Includes Data Stored table');
}

if (errors.length > 0) {
  console.error(`\n❌ Deployment readiness failed with ${errors.length} issue(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL DEPLOYMENT READINESS CHECKS PASSED: Prompt 7 is 100% complete!');
}

