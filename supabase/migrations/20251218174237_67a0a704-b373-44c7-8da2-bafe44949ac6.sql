-- Server-side validation + rate limiting for public contact form submissions

-- 1) Validate and normalize contact inquiries on INSERT
CREATE OR REPLACE FUNCTION public.validate_and_rate_limit_contact_inquiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- Normalize
  NEW.name := btrim(NEW.name);
  NEW.email := lower(btrim(NEW.email));
  NEW.message := btrim(NEW.message);

  IF NEW.company IS NOT NULL THEN
    NEW.company := btrim(NEW.company);
    IF NEW.company = '' THEN
      NEW.company := NULL;
    END IF;
  END IF;

  IF NEW.project_type IS NOT NULL THEN
    NEW.project_type := btrim(NEW.project_type);
    IF NEW.project_type = '' THEN
      NEW.project_type := NULL;
    END IF;
  END IF;

  IF NEW.budget_range IS NOT NULL THEN
    NEW.budget_range := btrim(NEW.budget_range);
    IF NEW.budget_range = '' THEN
      NEW.budget_range := NULL;
    END IF;
  END IF;

  -- Validate lengths (server-side)
  IF NEW.name IS NULL OR char_length(NEW.name) < 1 OR char_length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'invalid_name' USING ERRCODE = '22023';
  END IF;

  IF NEW.email IS NULL OR char_length(NEW.email) < 3 OR char_length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'invalid_email' USING ERRCODE = '22023';
  END IF;

  -- Basic email pattern (good enough for backend validation)
  IF NEW.email !~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'invalid_email' USING ERRCODE = '22023';
  END IF;

  IF NEW.company IS NOT NULL AND char_length(NEW.company) > 100 THEN
    RAISE EXCEPTION 'invalid_company' USING ERRCODE = '22023';
  END IF;

  IF NEW.message IS NULL OR char_length(NEW.message) < 1 OR char_length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'invalid_message' USING ERRCODE = '22023';
  END IF;

  -- Rate limit: max 5 submissions per email per hour
  SELECT count(*) INTO recent_count
  FROM public.contact_inquiries
  WHERE email = NEW.email
    AND created_at > now() - interval '1 hour';

  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'rate_limit_exceeded' USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

-- Ensure idempotency if re-running migration
DROP TRIGGER IF EXISTS trg_validate_rate_limit_contact_inquiry ON public.contact_inquiries;

CREATE TRIGGER trg_validate_rate_limit_contact_inquiry
BEFORE INSERT ON public.contact_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.validate_and_rate_limit_contact_inquiry();

-- 2) Explicitly restrict UPDATE/DELETE to admins (tightens RLS, reduces blast radius)
DO $$
BEGIN
  -- UPDATE policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_inquiries'
      AND policyname = 'Only admins can update contact inquiries'
  ) THEN
    CREATE POLICY "Only admins can update contact inquiries"
    ON public.contact_inquiries
    FOR UPDATE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));
  END IF;

  -- DELETE policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'contact_inquiries'
      AND policyname = 'Only admins can delete contact inquiries'
  ) THEN
    CREATE POLICY "Only admins can delete contact inquiries"
    ON public.contact_inquiries
    FOR DELETE
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;