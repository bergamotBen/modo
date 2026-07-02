  -- 1. Remove the old routing attempt
SELECT cron.unschedule('check-scheduled-pushes');

-- 2. Schedule using the host network bridge
SELECT cron.schedule(
    'check-scheduled-pushes',
    '* * * * *',
    $$
    SELECT net.http_post(
        -- 🚨 CHANGE: 'kong' becomes 'host.docker.internal' so Docker leaves its sandbox
        url := 'http://host.docker.internal:50021/functions/v1/send-push',
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