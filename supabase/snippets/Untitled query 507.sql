-- 1. Lock down the table from unauthenticated public access
ALTER TABLE public.scheduled_pushes ENABLE ROW LEVEL SECURITY;

-- 2. Allow your React frontend app (authenticated via anon_key) to schedule notifications
CREATE POLICY "Allow anonymous users to schedule a push" 
ON public.scheduled_pushes 
FOR INSERT 
WITH CHECK (true);

-- 3. Block anonymous users from viewing or modifying what other people scheduled
CREATE POLICY "Restrict public reading of the schedule queue" 
ON public.scheduled_pushes 
FOR SELECT 
USING (false);