ALTER TABLE push_subscriptions 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;