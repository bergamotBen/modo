CREATE OR REPLACE FUNCTION set_next_task_priority()
RETURNS TRIGGER 
LANGUAGE plpgsql
-- This line bypasses RLS during calculation by running the function as the DB admin
SECURITY DEFINER
-- This secures the search path, preventing security vulnerability exploits
SET search_path = public 
AS $$
DECLARE
  incoming_user_uuid UUID;
BEGIN
  -- 1. Store the user UUID
  incoming_user_uuid := NEW."user";

  -- 2. Count existing rows (now executes as admin, so it can see all rows!)
  NEW.priority := (
    SELECT COALESCE(COUNT(*), 0) + 1 
    FROM public.tasks AS t
    WHERE t."user" = incoming_user_uuid
  );
  
  RETURN NEW;
END;
$$;