import { supabase } from "../lib/supabase";

export async function schedulePush(userId, taskId, duration, title, body) {
  const time = new Date(Date.now() + duration * 60000).toISOString();
  const { data, error } = await supabase
    .from("scheduled_pushes")
    .insert([
      {
        user_id: userId,
        scheduled_for: time,
        payload: {
          title: title,
          body: body,
          taskId: taskId,
        },
      },
    ])
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function cancelPush(pushId) {
  await supabase.from("scheduled_pushes").delete().eq("id", pushId);
}
