SELECT cron.unschedule('check-scheduled-pushes');

SELECT cron.schedule(
    'check-scheduled-pushes',
    '* * * * *',
    $$
    SELECT net.http_post(
        url := 'http://supabase_kong_pomodoro:8000/functions/v1/send-push',
        headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || (
              SELECT decrypted_secret 
              FROM vault.decrypted_secrets 
              WHERE name = 'service_role_key'
            )
        ),
        body := sp.payload
    )
    FROM public.scheduled_pushes sp
    WHERE sp.scheduled_for <= NOW() AND sp.processed = FALSE;
    
    UPDATE public.scheduled_pushes 
    SET processed = TRUE 
    WHERE scheduled_for <= NOW() AND processed = FALSE;
    $$
);