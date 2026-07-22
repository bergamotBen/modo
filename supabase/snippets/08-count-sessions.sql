  -- 1. Remove the old routing attempt
SELECT cron.unschedule('check-scheduled-pushes');

-- 2. Schedule using the host network bridge
SELECT cron.schedule(
    'check-scheduled-pushes',
    '* * * * *',
    $$
    SELECT net.http_post(
        url := 'http://host.docker.internal:50021/functions/v1/send-push',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz"}'::jsonb,
        body := payload
    )
    FROM public.scheduled_pushes
    WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE;

UPDATE public.tasks
    SET sessions = COALESCE(sessions, 0) + 1
    WHERE id IN (
        SELECT (payload->>'taskId')::uuid
        FROM public.scheduled_pushes
        WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE
          AND payload->>'taskId' IS NOT NULL
    );

    UPDATE public.scheduled_pushes
    SET processed = TRUE
    WHERE scheduled_for <= (NOW() AT TIME ZONE 'Europe/London') AND processed = FALSE;
    $$
);