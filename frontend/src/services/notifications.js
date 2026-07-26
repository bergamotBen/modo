import { supabase } from "../lib/supabase";

export async function schedulePush(userId, duration, title, body) {
  const time = new Date(Date.now() + duration * 100).toISOString();
  const { data, error } = await supabase
    .from("scheduled_pushes")
    .insert([
      {
        user_id: userId,
        scheduled_for: time,
        payload: {
          title: title,
          body: body,
        },
      },
    ])
    .select("id")
    .single();

  if (data) {
    return data.id;
  } else {
    return error;
  }
}

export async function cancelPush(pushId) {
  await supabase.from("scheduled_pushes").delete().eq("id", pushId);
}
