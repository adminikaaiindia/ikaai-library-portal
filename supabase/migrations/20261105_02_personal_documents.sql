-- ============================================================================
-- MIGRATION: 20261105_02_personal_documents.sql
-- Module: Company Resources - Personal Documents, Access Logging & RBAC
-- Compliance: India's Digital Personal Data Protection (DPDP) Act 2023
-- ============================================================================

-- 1. PERSONAL DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.personal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'offer_letter',
    'certificate',
    'id_card',
    'evaluation_letter',
    'agreement',
    'payslip',
    'other'
  )),
  storage_path TEXT,
  file_name TEXT,
  file_size BIGINT,
  mime_type TEXT,
  issued_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  issued_at DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until DATE,
  requires_acknowledgement BOOLEAN NOT NULL DEFAULT false,
  acknowledged_at TIMESTAMPTZ,
  first_opened_at TIMESTAMPTZ,
  is_revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance & security
CREATE INDEX IF NOT EXISTS idx_personal_documents_recipient ON public.personal_documents(recipient_id);
CREATE INDEX IF NOT EXISTS idx_personal_documents_category ON public.personal_documents(category);
CREATE INDEX IF NOT EXISTS idx_personal_documents_issued_at ON public.personal_documents(issued_at DESC);
CREATE INDEX IF NOT EXISTS idx_personal_documents_revoked ON public.personal_documents(is_revoked);

-- 2. DOCUMENT ACCESS AUDIT LOG TABLE
CREATE TABLE IF NOT EXISTS public.document_access_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_kind TEXT NOT NULL CHECK (document_kind IN ('programme', 'personal')),
  document_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('view', 'download', 'acknowledge')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_doc_access_log_user ON public.document_access_log(user_id);
CREATE INDEX IF NOT EXISTS idx_doc_access_log_doc ON public.document_access_log(document_id);
CREATE INDEX IF NOT EXISTS idx_doc_access_log_created_at ON public.document_access_log(created_at DESC);

-- 3. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.personal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_access_log ENABLE ROW LEVEL SECURITY;

-- 4. ROW LEVEL SECURITY POLICIES: personal_documents
-- Recipient can SELECT only their own active (non-revoked) personal documents
DROP POLICY IF EXISTS "personal_documents_recipient_select" ON public.personal_documents;
CREATE POLICY "personal_documents_recipient_select"
  ON public.personal_documents
  FOR SELECT
  TO authenticated
  USING (
    recipient_id = auth.uid() AND is_revoked = false
  );

-- Admins can SELECT all personal documents (including revoked for audit)
DROP POLICY IF EXISTS "personal_documents_admin_select" ON public.personal_documents;
CREATE POLICY "personal_documents_admin_select"
  ON public.personal_documents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only Admins can INSERT personal documents
DROP POLICY IF EXISTS "personal_documents_admin_insert" ON public.personal_documents;
CREATE POLICY "personal_documents_admin_insert"
  ON public.personal_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only Admins can UPDATE personal documents directly
DROP POLICY IF EXISTS "personal_documents_admin_update" ON public.personal_documents;
CREATE POLICY "personal_documents_admin_update"
  ON public.personal_documents
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only Admins can DELETE personal documents
DROP POLICY IF EXISTS "personal_documents_admin_delete" ON public.personal_documents;
CREATE POLICY "personal_documents_admin_delete"
  ON public.personal_documents
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- NOTE: Instructors have NO access to personal_documents (no policy grants instructor access).

-- 5. ROW LEVEL SECURITY POLICIES: document_access_log
-- Users can insert their own access logs
DROP POLICY IF EXISTS "doc_access_log_insert_own" ON public.document_access_log;
CREATE POLICY "doc_access_log_insert_own"
  ON public.document_access_log
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
  );

-- Only Admins can SELECT access logs
DROP POLICY IF EXISTS "doc_access_log_admin_select" ON public.document_access_log;
CREATE POLICY "doc_access_log_admin_select"
  ON public.document_access_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- 6. RPC DATABASE FUNCTIONS FOR SECURE MUTATIONS
-- Mark personal document as opened (first time only)
CREATE OR REPLACE FUNCTION public.mark_document_opened(p_document_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_rec RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  SELECT * INTO v_rec FROM public.personal_documents
  WHERE id = p_document_id AND recipient_id = v_user_id AND is_revoked = false;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Document not found or access denied.';
  END IF;

  IF v_rec.first_opened_at IS NULL THEN
    UPDATE public.personal_documents
    SET first_opened_at = now()
    WHERE id = p_document_id;
  END IF;

  INSERT INTO public.document_access_log (document_kind, document_id, user_id, action)
  VALUES ('personal', p_document_id, v_user_id, 'view');

  RETURN jsonb_build_object('success', true, 'first_opened_at', COALESCE(v_rec.first_opened_at, now()));
END;
$$;

-- Acknowledge document
CREATE OR REPLACE FUNCTION public.acknowledge_document(p_document_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_rec RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required.';
  END IF;

  SELECT * INTO v_rec FROM public.personal_documents
  WHERE id = p_document_id AND recipient_id = v_user_id AND is_revoked = false;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Document not found or access denied.';
  END IF;

  IF NOT v_rec.requires_acknowledgement THEN
    RAISE EXCEPTION 'This document does not require acknowledgement.';
  END IF;

  UPDATE public.personal_documents
  SET acknowledged_at = now(),
      first_opened_at = COALESCE(first_opened_at, now())
  WHERE id = p_document_id;

  INSERT INTO public.document_access_log (document_kind, document_id, user_id, action)
  VALUES ('personal', p_document_id, v_user_id, 'acknowledge');

  RETURN jsonb_build_object('success', true, 'acknowledged_at', now());
END;
$$;

-- Log document action (view/download)
CREATE OR REPLACE FUNCTION public.log_document_access(
  p_document_kind TEXT,
  p_document_id UUID,
  p_action TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN false;
  END IF;

  INSERT INTO public.document_access_log (document_kind, document_id, user_id, action)
  VALUES (p_document_kind, p_document_id, v_user_id, p_action);

  RETURN true;
END;
$$;

-- Admin: Issue personal document securely
CREATE OR REPLACE FUNCTION public.issue_personal_document(
  p_recipient_id UUID,
  p_title TEXT,
  p_description TEXT,
  p_category TEXT,
  p_storage_path TEXT,
  p_file_name TEXT,
  p_file_size BIGINT,
  p_mime_type TEXT,
  p_issued_at DATE,
  p_valid_until DATE,
  p_requires_acknowledgement BOOLEAN
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin_id UUID;
  v_new_id UUID;
BEGIN
  v_admin_id := auth.uid();
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = v_admin_id AND role = 'admin') THEN
    RAISE EXCEPTION 'Only administrators can issue personal documents.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_recipient_id) THEN
    RAISE EXCEPTION 'Target recipient profile not found.';
  END IF;

  INSERT INTO public.personal_documents (
    recipient_id, title, description, category, storage_path, file_name, file_size, mime_type,
    issued_by, issued_at, valid_until, requires_acknowledgement
  ) VALUES (
    p_recipient_id, p_title, p_description, p_category, p_storage_path, p_file_name, p_file_size, p_mime_type,
    v_admin_id, COALESCE(p_issued_at, CURRENT_DATE), p_valid_until, COALESCE(p_requires_acknowledgement, false)
  )
  RETURNING id INTO v_new_id;

  RETURN jsonb_build_object('success', true, 'id', v_new_id);
END;
$$;

-- 7. STORAGE BUCKET: personal-documents (PRIVATE)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'personal-documents',
  'personal-documents',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
  public = false,
  file_size_limit = 10485760;

-- 8. STORAGE RLS POLICIES FOR personal-documents
-- Storage path structure: {recipient_id}/{doc_id}/{filename}
-- The recipient can read ONLY files under their own user id folder:
DROP POLICY IF EXISTS "personal_documents_storage_recipient_read" ON storage.objects;
CREATE POLICY "personal_documents_storage_recipient_read"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'personal-documents' AND
    (
      -- Recipient can only access if first folder matches their auth.uid()
      (storage.foldername(name))[1] = auth.uid()::text
      OR
      -- Or user is admin
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
      )
    )
  );

-- Only Admins can upload to personal-documents bucket
DROP POLICY IF EXISTS "personal_documents_storage_admin_insert" ON storage.objects;
CREATE POLICY "personal_documents_storage_admin_insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'personal-documents' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only Admins can update or delete files in personal-documents bucket
DROP POLICY IF EXISTS "personal_documents_storage_admin_update" ON storage.objects;
CREATE POLICY "personal_documents_storage_admin_update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'personal-documents' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

DROP POLICY IF EXISTS "personal_documents_storage_admin_delete" ON storage.objects;
CREATE POLICY "personal_documents_storage_admin_delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'personal-documents' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

