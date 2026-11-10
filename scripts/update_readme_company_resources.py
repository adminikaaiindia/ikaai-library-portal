# encoding: utf-8
import sys

print("Rewriting Company Resources section in README.md...")

with open("README.md", "r", encoding="utf-8") as f:
    text = f.read()

pos = text.find("## \U0001f4c1 Company Resources")
if pos == -1:
    pos = text.find("## 📁 Company Resources")

new_readme_section = """## 📁 Company Resources (Official & Personal Documents Repository)

The **Company Resources** section (`ROLES & REPOSITORIES > Company Resources`) provides a centralized, role-governed document distribution hub for:
- **Tab 1: Programme Documents**: Official policies, guidelines, templates, forms, letters, and reports issued to cohorts or across the entire organization.
- **Tab 2: My Documents**: Confidential documents issued personally to the signed-in user (offer letters, access cards, non-disclosure agreements, stipend letters, certificates) with mandatory formal acknowledgement workflows.
- **Tab 3: Manage (Admins Only)**: Full administrative oversight to issue personal documents individually, execute batch dispatches via CSV, revoke documents, replace files, view per-user dossiers, and audit access logs.

---

### 🛡️ India DPDP Act 2023 Statutory Compliance Note
> [!IMPORTANT]
> Personal documents (offer letters, ID cards, evaluations, agreements, and payslips) contain sensitive Personally Identifiable Information (PII) protected under **India's Digital Personal Data Protection (DPDP) Act 2023**.
> Access is enforced at both the PostgreSQL database layer (Row Level Security) and the Supabase Storage object layer:
> - **Zero Peer Access**: Interns can never view, guess, or access another intern's personal documents.
> - **Zero Instructor Access**: Instructors have NO access to personal documents or the personal storage bucket.
> - **Short-Lived Signed URLs**: Files are served exclusively through 60-second temporary signed URLs created after an explicit authorization check.
> - **Tamper-Evident Audit Logging**: Every view, download, and acknowledgement is immutably recorded in `public.document_access_log`.

---

### 1. SQL Migrations Execution Order
Execute the following migration files in the **Supabase Dashboard > SQL Editor** in order:

1. **`supabase/migrations/20261105_01_company_resources.sql`**:
   - Creates `public.company_documents`, `public.document_versions`, and `public.company_document_downloads`.
   - Establishes RLS policies for programme documents:
     - **Interns**: Read-only access to published, non-archived documents for their assigned programme or global documents (`programme_id IS NULL`).
     - **Instructors**: Read/write access restricted to their own programme track + read access to global documents.
     - **Admins**: Full global access.
   - Configures the private `company-documents` storage bucket with path RLS.

2. **`supabase/migrations/20261105_02_personal_documents.sql`**:
   - Creates `public.personal_documents` and `public.document_access_log`.
   - Enforces strict DPDP RLS: recipients can read only their own non-revoked rows (`recipient_id = auth.uid()`).
   - Grants write, revoke, and audit permissions exclusively to administrators.
   - Implements database RPC functions: `mark_document_opened(p_document_id)`, `acknowledge_document(p_document_id)`, `log_document_access(p_document_kind, p_document_id, p_action)`, and `issue_personal_document(...)`.
   - Creates the private `personal-documents` storage bucket with folder-level isolation (`(storage.foldername(name))[1] = auth.uid()::text`).

3. **(Optional) `supabase/demo_company_documents.sql`**:
   - Optional demo seed containing sample policies, templates, and confidential personal documents with valid hex UUIDs for offline or staging testing.
   - *Do not run this script on a live production deployment.*

---

### 2. Private Storage Buckets Setup

The migrations automatically create the two required storage buckets:
- **`company-documents`**: Private (`public = false`), max file size 20 MB.
- **`personal-documents`**: Private (`public = false`), max file size 10 MB.

If your Supabase instance prevents bucket creation via SQL:
1. Open **Supabase Dashboard > Storage > Buckets**.
2. Click **New Bucket**:
   - Bucket 1 Name: `company-documents` &bull; **Public bucket: OFF (Private)** &bull; File size: 20 MB.
   - Bucket 2 Name: `personal-documents` &bull; **Public bucket: OFF (Private)** &bull; File size: 10 MB.
3. In Storage Policies, verify that Row Level Security is active for both buckets.

---

### 3. How to Issue the First Programme Document
1. Sign in with an account having role `admin` or `instructor`.
2. Navigate to **ROLES & REPOSITORIES > Company Resources**.
3. On **Tab 1: Programme Documents**, click **Issue Programme Doc**.
4. In the modal:
   - **Title**: e.g., *Leave & Attendance Policy 2026*
   - **Type**: Select Policy, Guideline, Template, Form, Letter, Report, or Other.
   - **Target Programme**: Instructors are locked to their own cohort; Admins can select *All Programmes* or a specific track.
   - **Version & Date**: e.g., `1.0` and current date.
   - **Attach File**: PDF, DOCX, XLSX, PPTX, PNG, JPG (max 20 MB).
   - **Publish**: Check "Publish immediately" (or uncheck to keep in Drafts).
5. Click **Issue Document**.

---

### 4. How to Issue the First Personal Document (Admins Only)

#### Method A: Single Issuance
1. Sign in with an account having role `admin`.
2. Go to **Company Resources > Manage Tab**.
3. Click **Issue Personal Document**.
4. Select the **Recipient** from the registered user dropdown.
5. Select the **Category** (Offer Letter, Certificate, ID Card, Evaluation, Agreement, Payslip, Other).
6. Set Title, Description, and Issue Date.
7. *(Optional)* Toggle **"Requires recipient acknowledgement"** for agreements or offer letters.
8. Attach the document file (PDF, DOCX, PNG, JPG; max 10 MB).
9. Confirm the privacy banner: *"This document will be visible only to [Recipient Name]"*.
10. Click **Issue Personal Document**.

#### Method B: Bulk Dispatch via CSV
1. On the **Manage Tab**, click **Bulk Issue (CSV)**.
2. Prepare a CSV file with columns:
   ```csv
   email,title,category,issue_date,file_name,requires_acknowledgement
   rohan.verma@ikaaiindia.org,Internship Appointment Letter,offer_letter,2026-11-03,Rohan_Offer.pdf,true
   sneha.patel@ikaaiindia.org,Internship Appointment Letter,offer_letter,2026-11-03,Sneha_Offer.pdf,true
   ```
3. Select your `.csv` file and multi-select the referenced `.pdf` or `.docx` files.
4. Review the automated verification preview table (matches recipient emails and file attachments).
5. Click **Issue Valid Documents**.
"""

if pos != -1:
    text = text[:pos] + new_readme_section
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(text)
    print("[OK] Successfully updated README.md")
else:
    print("! Could not find Company Resources header in README.md")

