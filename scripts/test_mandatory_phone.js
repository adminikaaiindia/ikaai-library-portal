// scripts/test_mandatory_phone.js
const assert = require('assert');
const fs = require('fs');

console.log('=== MANDATORY PHONE NUMBER VERIFICATION ===\n');

// 1. Check index.html
const html = fs.readFileSync('index.html', 'utf8');
assert.ok(!html.includes('Phone Number <span style="font-size: 11px; color: var(--text-secondary); font-weight: 400;">(Optional)</span>'), 'Optional label must be removed');
assert.ok(html.includes('Phone Number <span style="color: var(--accent-light);">*</span>'), 'Mandatory star indicator must be present');
assert.ok(html.includes('<input type="tel" id="userPhoneInput" class="form-text-input" placeholder="+91 98765 43210" required>'), 'Input must have required attribute');
console.log('✓ index.html structure verified (mandatory label & required attribute present).');

// 2. Check app.js validation
const appJs = fs.readFileSync('app.js', 'utf8');
assert.ok(appJs.includes('Phone number is mandatory. Please enter your contact number.'), 'app.js must block empty phone');
console.log('✓ app.js validation verified.');

// 3. Check data.js validation
const dataJs = fs.readFileSync('data.js', 'utf8');
assert.ok(dataJs.includes("throw new Error('Phone number is mandatory.');"), 'data.js must throw error on empty phone');
console.log('✓ data.js validation verified.');

console.log('\nALL MANDATORY PHONE CHECKS PASSED SUCCESSFULLY!');

