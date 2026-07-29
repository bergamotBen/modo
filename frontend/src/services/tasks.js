import { supabase } from "../lib/supabase";

export async function getTasks(
  userId,
  {
    complete = null,
    active = null,
    archived = null,
    orderBy = "priority",
    ascending = true,
  } = {},
) {
  if (!userId) throw new Error("Required: userId");

  let query = supabase.from("tasks").select("*").eq("user", userId);

  if (complete !== null) {
    query = query.eq("complete", complete);
  }

  if (active !== null) {
    query = query.eq("active", active);
  }
  if (archived !== null) {
    query = query.eq("archived", archived);
  }
  query = query.order(orderBy, { ascending });

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function markAsComplete(userId, taskId, active = null) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      complete: true,
      active: false,
      completed_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("user", userId)
    .select();

  if (active) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        active: true,
      })
      .eq("priority", 1)
      .eq("user", userId)
      .select();
  }
}

export async function archiveTask(userId, taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      archived: true,
      active: false,
      priority: null,
    })
    .eq("id", taskId)
    .eq("user", userId)
    .select();

  if (error) {
    console.error("Error marking task as complete:", error.message);
    throw error;
  }

  return data;
}

export async function markAsIncomplete(userId, taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      complete: false,
      active: false,
      completed_at: null,
    })
    .eq("id", taskId)
    .eq("user", userId)
    .select();

  if (error) {
    console.error("Error marking task as incomplete:", error.message);
    throw error;
  }

  return data;
}
