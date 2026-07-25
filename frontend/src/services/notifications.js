import { supabase } from "../lib/supabase";

export async function schodooeduleNotification(messageText, delayInMinutes) {
  // Calculate target time
  const scheduledTime = new Date();
  scheduledTime.setMinutes(scheduledTime.getMinutes() + delayInMinutes);

  // Insert row into table
  const { data, error } = await supabase.from("scheduled_pushes").insert([
    {
      scheduled_for: scheduledTime.toISOString(),
      payload: {
        title: "Scheduled Alert!",
        body: messageText,
      },
    },
  ]);
}

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
  await supabase.from("scheduledPushes").delete().eq("id", pushId);
}
