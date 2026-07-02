import { supabase } from "../lib/supabase";

export async function scheduleNotification(messageText, delayInMinutes) {
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
