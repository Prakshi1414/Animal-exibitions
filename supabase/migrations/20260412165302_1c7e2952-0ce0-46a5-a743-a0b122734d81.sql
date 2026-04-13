
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fix exhibitions policies: only admins can write
DROP POLICY "Authenticated users can insert exhibitions" ON public.exhibitions;
DROP POLICY "Authenticated users can update exhibitions" ON public.exhibitions;
DROP POLICY "Authenticated users can delete exhibitions" ON public.exhibitions;

CREATE POLICY "Admins can insert exhibitions"
  ON public.exhibitions FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update exhibitions"
  ON public.exhibitions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete exhibitions"
  ON public.exhibitions FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Fix gallery_items policies: only admins can write
DROP POLICY "Authenticated users can manage gallery items" ON public.gallery_items;
DROP POLICY "Authenticated users can update gallery items" ON public.gallery_items;
DROP POLICY "Authenticated users can delete gallery items" ON public.gallery_items;

CREATE POLICY "Admins can insert gallery items"
  ON public.gallery_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery items"
  ON public.gallery_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery items"
  ON public.gallery_items FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Fix contact_submissions: only admins can read
DROP POLICY "Authenticated users can view submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
