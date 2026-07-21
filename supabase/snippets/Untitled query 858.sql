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

  -- 2. Count existing tasks that are both inactive and incomplete
  NEW.priority := (
    SELECT COALESCE(COUNT(*), 0) + 1 
    FROM public.tasks AS t
    WHERE t."user" = incoming_user_uuid
      AND t.active = false    -- Only count tasks where active is false
      AND t.complete = false  -- Only count tasks where complete is false
  );
  
  RETURN NEW;
END;
$$;