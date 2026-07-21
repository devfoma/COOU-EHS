-- COUU-EHS Supabase Database Schema
-- Run this in the SQL Editor of your Supabase project dashboard.

-- 1. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'staff', 'officer', 'supervisor', 'admin', 'management')),
    name TEXT NOT NULL,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.current_profile_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.prevent_profile_role_self_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND public.current_profile_role() <> 'admin' THEN
    RAISE EXCEPTION 'Only administrators can change profile roles.';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER prevent_profile_role_self_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_self_escalation();

DROP POLICY IF EXISTS "Allow public read access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update their own profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are visible to owners and EHS leadership" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own student or staff profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile details" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;

CREATE POLICY "Profiles are visible to owners and EHS leadership"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (
      auth.uid() = id
      OR public.current_profile_role() IN ('officer', 'supervisor', 'admin', 'management')
    );

CREATE POLICY "Users can create their own student or staff profile"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (
      auth.uid() = id
      AND role IN ('student', 'staff')
    );

CREATE POLICY "Users can update their own profile details"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (public.current_profile_role() = 'admin')
    WITH CHECK (public.current_profile_role() = 'admin');

-- 2. Hazard Reports Table
CREATE TABLE IF NOT EXISTS public.hazard_reports (
    id TEXT PRIMARY KEY, -- Format: HAZ-XXXX
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status TEXT NOT NULL DEFAULT 'Reported',
    reporter_name TEXT NOT NULL,
    reporter_id UUID REFERENCES public.profiles(id),
    assigned_to TEXT DEFAULT 'Unassigned',
    assigned_officer_id UUID REFERENCES public.profiles(id),
    description TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.hazard_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read access to hazard reports" ON public.hazard_reports;
DROP POLICY IF EXISTS "Allow authenticated users to create reports" ON public.hazard_reports;
DROP POLICY IF EXISTS "Allow officers/supervisors/admins to update reports" ON public.hazard_reports;
DROP POLICY IF EXISTS "Users read own reports and operators read all" ON public.hazard_reports;
DROP POLICY IF EXISTS "Authenticated users create their own reports" ON public.hazard_reports;
DROP POLICY IF EXISTS "Operators update hazard reports" ON public.hazard_reports;

CREATE POLICY "Users read own reports and operators read all"
    ON public.hazard_reports FOR SELECT
    TO authenticated
    USING (
      reporter_id = auth.uid()
      OR public.current_profile_role() IN ('officer', 'supervisor', 'admin', 'management')
    );

CREATE POLICY "Authenticated users create their own reports"
    ON public.hazard_reports FOR INSERT
    TO authenticated
    WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Operators update hazard reports"
    ON public.hazard_reports FOR UPDATE
    TO authenticated
    USING (public.current_profile_role() IN ('officer', 'supervisor', 'admin'))
    WITH CHECK (public.current_profile_role() IN ('officer', 'supervisor', 'admin'));

-- 3. Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('low', 'high', 'critical')),
    time_label TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to alerts" ON public.alerts;
DROP POLICY IF EXISTS "Allow supervisors/admins to insert alerts" ON public.alerts;
DROP POLICY IF EXISTS "Authenticated users can read alerts" ON public.alerts;
DROP POLICY IF EXISTS "Supervisors and admins manage alerts" ON public.alerts;

CREATE POLICY "Authenticated users can read alerts"
    ON public.alerts FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Supervisors and admins manage alerts"
    ON public.alerts FOR ALL
    TO authenticated
    USING (public.current_profile_role() IN ('supervisor', 'admin'))
    WITH CHECK (public.current_profile_role() IN ('supervisor', 'admin'));

-- 4. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow authenticated users to insert activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Authenticated users can read activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Authenticated users can insert activity logs" ON public.activity_logs;

CREATE POLICY "Authenticated users can read activity logs"
    ON public.activity_logs FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can insert activity logs"
    ON public.activity_logs FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IS NOT NULL);

-- 5. Helper Function to automatically create profile on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, department)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'New Campus User'),
    CASE
      WHEN new.raw_user_meta_data->>'role' IN ('student', 'staff') THEN new.raw_user_meta_data->>'role'
      ELSE 'student'
    END,
    new.raw_user_meta_data->>'department'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed Data (Incidents)
INSERT INTO public.hazard_reports (id, title, category, location, severity, status, reporter_name, assigned_to, description, progress)
VALUES 
('HAZ-2904', 'Chemical Leak - Block C-14', 'Laboratory', 'Science Complex, Lab 4B', 'critical', 'In Progress', 'Dr. Ifeoma N.', 'Officer Marcus R.', 'Chemical odor detected near reagent storage. Students evacuated from adjacent rooms.', 68)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.hazard_reports (id, title, category, location, severity, status, reporter_name, assigned_to, description, progress)
VALUES 
('HAZ-1841', 'Elevator Malfunction', 'Infrastructure', 'Administrative Block', 'high', 'Assigned', 'Chiamaka O.', 'Facility Response Unit', 'Elevator doors are closing irregularly. Access restricted pending inspection.', 38)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.hazard_reports (id, title, category, location, severity, status, reporter_name, assigned_to, description, progress)
VALUES 
('HAZ-1377', 'Waste Disposal Clearance', 'Waste', 'Zone D Collection Bay', 'low', 'Awaiting Verification', 'Emeka A.', 'Sanitation Unit', 'Hazardous waste pickup scheduled. Decontamination documents required before exit.', 84)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.hazard_reports (id, title, category, location, severity, status, reporter_name, assigned_to, description, progress)
VALUES 
('HAZ-9842', 'Faulty Lighting - West Parking', 'Electrical', 'West Parking Area', 'medium', 'Investigating', 'Student Affairs', 'Maintenance Unit', 'Three light poles are inactive around the evening parking route.', 52)
ON CONFLICT (id) DO NOTHING;

-- Seed Data (Alerts)
INSERT INTO public.alerts (title, location, severity, time_label, body)
VALUES 
('Chemical Spill', 'Science Complex', 'critical', 'Active now', 'Avoid Block C corridor until EHS officers complete containment.'),
('Power Outage', 'Engineering Annex', 'high', 'Ends 4:30 PM', 'Use marked stair routes. Maintenance team is restoring supply.'),
('Clinic Sanitation Drill', 'Medical Centre', 'low', 'Oct 24', 'Routine safety inspection and hand hygiene audit in progress.')
ON CONFLICT DO NOTHING;

-- Seed Data (Activity Logs)
INSERT INTO public.activity_logs (description)
VALUES 
('Officer Marcus R. updated HAZ-2904 to In Progress.'),
('New evidence uploaded for HAZ-1841.'),
('Sanitation Unit requested verification for HAZ-1377.'),
('Campus alert published for Science Complex.');
