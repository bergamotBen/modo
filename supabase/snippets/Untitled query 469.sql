-- Run this in your Supabase Studio SQL Editor (on your custom studio port)

SELECT cron.unschedule('check-scheduled-pushes');

SELECT cron.schedule(
    'check-scheduled-pushes',
    '* * * * *',
    $$
    SELECT net.http_post(
        -- Target your specific project's gateway port
        url := 'http://kong:50021/functions/v1/send-push',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz"}'::jsonb,
        body := payload 
    )
    FROM public.scheduled_pushes
    WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE;
    
    UPDATE public.scheduled_pushes 
    SET processed = TRUE 
    WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE;
    $$
);