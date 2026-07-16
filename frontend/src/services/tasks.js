import { supabase } from "../lib/supabase";

export async function getTasks(
  userId,
  { complete = null, orderBy = "priority", ascending = true } = {},
) {
  if (!userId) throw new Error("Required: userId");

  let query = supabase.from("tasks").select("*").eq("user", userId);

  if (complete !== null) {
    query = query.eq("complete", complete);
  }

  query = query.order(orderBy, { ascending });

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function markAsComplete(userId, taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      complete: true,
      completed_at: new Date().toISOString(),
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
