-- 1. Add endpoint column
ALTER TABLE public.push_subscriptions 
ADD COLUMN IF NOT EXISTS endpoint TEXT UNIQUE;

-- 2. Populate existing rows (if any)
UPDATE public.push_subscriptions 
SET endpoint = subscription->>'endpoint' 
WHERE endpoint IS NULL;