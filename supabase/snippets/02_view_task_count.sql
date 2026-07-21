create or replace view user_task_stats as
select
  "user",
  count(*) filter (
    where created_at >= date_trunc('day', now())
  ) as today_count,
  count(*) filter (
    where created_at >= date_trunc('week', now())
  ) as week_count
from tasks
group by "user";