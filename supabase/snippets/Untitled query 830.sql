-- 1. Explicitly enable Row Level Security
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- 2. Create the policy allowing your React app (anon_key) to insert rows
CREATE POLICY "Allow anonymous inserts" 
ON public.push_subscriptions 
FOR INSERT 
WITH CHECK (true);