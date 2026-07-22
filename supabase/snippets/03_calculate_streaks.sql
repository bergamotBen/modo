create or replace view user_task_streaks as
with user_completed_dates as (
  -- Step 1: Distinct dates when tasks were completed
  select distinct
    user_id,
    (completed_at at time zone 'UTC')::date as completed_date
  from tasks
  where completed_at is not null
),
date_groups as (
  -- Step 2: Gaps & Islands - consecutive dates get the same 'grp' anchor
  select
    user_id,
    completed_date,
    completed_date - (row_number() over (partition by user_id order by completed_date))::int as grp
  from user_completed_dates
),
streaks as (
  -- Step 3: Calculate start, end, and total days for each streak
  select
    user_id,
    count(*) as streak_length,
    min(completed_date) as start_date,
    max(completed_date) as end_date
  from date_groups
  group by user_id, grp
)
-- Step 4: Aggregate per user for current vs. longest
select
  u.user_id,
  -- Today & Week counts (from earlier)
  count(distinct t.id) filter (where t.created_at >= date_trunc('day', now())) as today_count,
  count(distinct t.id) filter (where t.created_at >= date_trunc('week', now())) as week_count,
  -- Longest streak of all time
  coalesce(max(s.streak_length), 0) as longest_streak,
  -- Current streak (must have ended today or yesterday to still be active)
  coalesce(
    max(s.streak_length) filter (
      where s.end_date >= current_date - interval '1 day'
    ), 
    0
  ) as current_streak
from (select distinct user_id from tasks) u
left join tasks t on u.user_id = t.user_id
left join streaks s on u.user_id = s.user_id
group by u.user_id;