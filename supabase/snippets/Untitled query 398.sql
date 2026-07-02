SELECT cron.schedule(
    'check-scheduled-pushes',
    '* * * * *',
    $$
    SELECT net.http_post(
        url := 'http://127.0.0.1:54321/functions/v1/send-push',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
        body := '{}'::jsonb
    )
    FROM public.scheduled_pushes
    -- 🚨 THE FIX: Force Postgres to compare using the UK's current local time rule
    WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE;
    
    UPDATE public.scheduled_pushes 
    SET processed = TRUE 
    WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE;
    $$
);