CREATE OR REPLACE FUNCTION clean_and_reorder_task_priorities()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public 
AS $$
BEGIN
  -- CRITICAL CHECK: If the priority itself is changing, STOP. 
  -- This prevents the trigger from overriding manual drag-and-drop actions.
  IF (OLD.priority IS DISTINCT FROM NEW.priority) THEN
    RETURN NEW;
  END IF;

  -- Otherwise, run the clean-up reorder if status changed
  IF (OLD.active IS DISTINCT FROM NEW.active) OR (OLD.complete IS DISTINCT FROM NEW.complete) THEN
    WITH reordered_tasks AS (
      SELECT id, ROW_NUMBER() OVER (ORDER BY priority ASC, created_at ASC) as new_priority
      FROM public.tasks
      WHERE "user" = NEW."user"
        AND active = false
        AND complete = false
    )
    UPDATE public.tasks AS t
    SET priority = r.new_priority
    FROM reordered_tasks AS r
    WHERE t.id = r.id;

    IF NEW.active = true OR NEW.complete = true THEN
      UPDATE public.tasks SET priority = NULL WHERE id = NEW.id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;