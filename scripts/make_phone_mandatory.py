# scripts/make_phone_mandatory.py

# 1. Update index.html
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

target_html = """            <div class="modal-form-group">
              <label class="modal-field-label">Phone Number <span style="font-size: 11px; color: var(--text-secondary); font-weight: 400;">(Optional)</span></label>
              <input type="tel" id="userPhoneInput" class="form-text-input" placeholder="+91 98765 43210">
            </div>"""

replacement_html = """            <div class="modal-form-group">
              <label class="modal-field-label">Phone Number <span style="color: var(--accent-light);">*</span></label>
              <input type="tel" id="userPhoneInput" class="form-text-input" placeholder="+91 98765 43210" required>
            </div>"""

if target_html in html:
    html = html.replace(target_html, replacement_html)
    print("Updated phone number field in index.html to mandatory.")
else:
    print("WARNING: target_html not found in index.html!")

html = html.replace("and your optional contact phone number.", "and your contact phone number.")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)


# 2. Update app.js
with open("app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

target_validation = """        if (!newName || newName.length < 2 || newName.length > 60) {
          showAccountBanner(el.profileDetailsFeedback, 'Full name must be between 2 and 60 characters.', 'error');
          return;
        }

        if (newPhone && !/^\\+?[\\d\\s\\-()]{7,20}$/.test(newPhone)) {
          showAccountBanner(el.profileDetailsFeedback, 'Please enter a valid phone number (e.g. +91 98765 43210).', 'error');
          return;
        }"""

replacement_validation = """        if (!newName || newName.length < 2 || newName.length > 60) {
          showAccountBanner(el.profileDetailsFeedback, 'Full name must be between 2 and 60 characters.', 'error');
          return;
        }

        if (!newPhone) {
          showAccountBanner(el.profileDetailsFeedback, 'Phone number is mandatory. Please enter your contact number.', 'error');
          if (el.userPhoneInput) el.userPhoneInput.focus();
          return;
        }

        if (!/^\\+?[\\d\\s\\-()]{7,20}$/.test(newPhone)) {
          showAccountBanner(el.profileDetailsFeedback, 'Please enter a valid phone number (e.g. +91 98765 43210).', 'error');
          if (el.userPhoneInput) el.userPhoneInput.focus();
          return;
        }"""

if target_validation in app_js:
    app_js = app_js.replace(target_validation, replacement_validation)
    print("Updated phone validation in app.js.")
else:
    print("WARNING: target_validation not found in app.js!")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(app_js)


# 3. Update data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_js = f.read()

target_data_phone = """        if (phone !== undefined) {
          const trimmedPhone = phone ? phone.trim() : null;
          if (trimmedPhone && !/^\\+?[\\d\\s\\-()]{7,20}$/.test(trimmedPhone)) {
            throw new Error('Please enter a valid phone number (e.g. +91 98765 43210).');
          }
          updates.phone = trimmedPhone || null;
        }"""

replacement_data_phone = """        if (phone !== undefined) {
          const trimmedPhone = phone ? phone.trim() : '';
          if (!trimmedPhone) {
            throw new Error('Phone number is mandatory.');
          }
          if (!/^\\+?[\\d\\s\\-()]{7,20}$/.test(trimmedPhone)) {
            throw new Error('Please enter a valid phone number (e.g. +91 98765 43210).');
          }
          updates.phone = trimmedPhone;
        }"""

if target_data_phone in data_js:
    data_js = data_js.replace(target_data_phone, replacement_data_phone)
    print("Updated phone validation in data.js.")
else:
    print("WARNING: target_data_phone not found in data.js!")

with open("data.js", "w", encoding="utf-8") as f:
    f.write(data_js)

