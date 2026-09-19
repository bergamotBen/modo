CREATE OR REPLACE FUNCTION set_next_task_priority()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public 
AS $$
DECLARE
  incoming_user_uuid UUID;
  existing_active_count INT;
  existing_inactive_count INT;
BEGIN
  incoming_user_uuid := NEW."user";

  -- Check if there's already an ACTIVE task
  existing_active_count := (
    SELECT COALESCE(COUNT(*), 0)
    FROM public.tasks AS t
    WHERE t."user" = incoming_user_uuid
      AND t.active = true
      AND t.complete = false
      AND t.archived = false
  );
  
  -- If NO active task exists, make this one active
  IF existing_active_count = 0 THEN
    NEW.active := true;
    NEW.priority := NULL;
  ELSE
    -- Otherwise, this is an inactive queued task
    NEW.active := false;
    
    -- Count existing inactive tasks to assign priority
    existing_inactive_count := (
      SELECT COALESCE(COUNT(*), 0)
      FROM public.tasks AS t
      WHERE t."user" = incoming_user_uuid
        AND t.active = false
        AND t.complete = false
        AND t.archived = false
    );
    
    NEW.priority := existing_inactive_count + 1;
  END IF;
  
  RETURN NEW;
END;
$$;