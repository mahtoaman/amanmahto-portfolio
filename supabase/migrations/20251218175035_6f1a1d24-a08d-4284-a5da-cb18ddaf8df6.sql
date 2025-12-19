-- Add missing UPDATE/DELETE policies for newsletter_subscribers table (GDPR compliance)

-- Admins can update any subscriber (e.g., mark as inactive, update unsubscribed_at)
CREATE POLICY "Admins can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can delete subscribers (GDPR right to be forgotten)
CREATE POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));