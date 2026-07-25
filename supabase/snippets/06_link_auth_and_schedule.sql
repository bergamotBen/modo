ALTER TABLE public.scheduled_pushes
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;