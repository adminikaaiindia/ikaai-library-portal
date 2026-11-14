/**
 * Ikaai Library Portal - Production Build & Asset Verification Script
 * Validates integrity of frontend assets, checks for forbidden strings / keys,
 * and reports file payload sizes.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const REQUIRED_FILES = [
  'index.html',
  'styles.css',
  'app.js',
  'data.js',
  'supabase-client.js',
  'supabase-config.js',
  'logo.png',
  '404.html'
];

const FORBIDDEN_PATTERNS = [
  { pattern: /service_role/i, label: 'Service Role Key in frontend' },
  { pattern: /"role"\s*:\s*"service_role"/i, label: 'Service Role JWT in client asset' },
  { pattern: /admin\.ikaaiindia@gmail\.com/, label: 'Hardcoded Root Admin email' },
  { pattern: /akshaytiwarigaming@gmail\.com/, label: 'Developer personal email' },
  { pattern: /akshaytiwari8527@gmail\.com/, label: 'Developer personal email' }
];

function runBuildVerification() {
  console.log('====================================================');
  console.log('IKAAI LIBRARY PORTAL – PRODUCTION BUILD VERIFICATION');
  console.log('====================================================\n');

  let hasErrors = false;

  // 1. Check required runtime files
  console.log('1. Checking required runtime distribution files...');
  REQUIRED_FILES.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ MISSING REQUIRED FILE: ${file}`);
      hasErrors = true;
    } else {
      const stats = fs.statSync(filePath);
      const kb = (stats.size / 1024).toFixed(1);
      console.log(`  ✓ ${file.padEnd(22)} (${kb} KB)`);
    }
  });

  // 2. Scan core files for forbidden patterns and secrets
  console.log('\n2. Scanning client assets for security violations...');
  const filesToScan = ['index.html', 'app.js', 'data.js', 'supabase-client.js', 'supabase-config.js'];
  filesToScan.forEach(file => {
    const filePath = path.join(ROOT_DIR, file);
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');

    FORBIDDEN_PATTERNS.forEach(({ pattern, label }) => {
      if (pattern.test(content)) {
        console.error(`  ❌ SECURITY ALERT in ${file}: Found "${label}"`);
        hasErrors = true;
      }
    });
  });

  // 3. Verify .nojekyll exists for GitHub Pages
  console.log('\n3. Checking GitHub Pages configuration...');
  const noJekyllPath = path.join(ROOT_DIR, '.nojekyll');
  if (!fs.existsSync(noJekyllPath)) {
    fs.writeFileSync(noJekyllPath, '');
    console.log('  ✓ Created .nojekyll to ensure GitHub Pages serves all assets');
  } else {
    console.log('  ✓ .nojekyll is present');
  }

  // Summary
  console.log('\n====================================================');
  if (hasErrors) {
    console.error('❌ BUILD VERIFICATION FAILED: Resolve issues before releasing.');
    process.exit(1);
  } else {
    console.log('✓ ALL PRODUCTION CHECKS PASSED: Assets are secure and verified.');
  }
  console.log('====================================================\n');
}

runBuildVerification();
