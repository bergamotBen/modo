create or replace view user_task_stats as
select
  "user",
  coalesce(
    sum(coalesce(sessions, 1)) filter (
      where completed_at >= date_trunc('day', now())
      and complete = true
    ),
    0
  ) as today_count,
  coalesce(
    sum(coalesce(sessions, 1)) filter (
      where completed_at >= date_trunc('week', now())
      and complete = true
    ),
    0
  ) as week_count
from tasks
group by "user";