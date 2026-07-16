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
