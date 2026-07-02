select
  jobid,
  start_time,
  end_time,
  status,
  return_message
from
  cron.job_run_details
order by
  start_time desc
limit
  10;