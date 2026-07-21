-- Index to speed up filtering tasks by user and creation date
create index if not exists idx_tasks_user_created 
on tasks (user_id, created_at);