CREATE OR REPLACE FUNCTION set_next_task_priority()
RETURNS TRIGGER AS $$
DECLARE
  -- We declare a local variable to hold the incoming user UUID 
  -- to completely separate it from Postgres keywords.
  incoming_user_uuid UUID;
BEGIN
  -- 1. Grab the user ID from the incoming record
  incoming_user_uuid := NEW."user";

  -- 2. Count using the local variable, aliasing the table to prevent clashes
  NEW.priority := (
    SELECT COALESCE(COUNT(*), 0) + 1 
    FROM public.tasks AS t
    WHERE t."user" = incoming_user_uuid
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;