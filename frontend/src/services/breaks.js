import { supabase } from "../lib/supabase";

export async function getBreakInfo(userId) {
  if (!userId) throw new Error("Required: userId");

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("breaks")
    .select("*")
    .eq("user_id", userId)
    .lte("started_at", now)
    .gte("ends_at", now)
    .maybeSingle();

  if (error) throw error;

  if (!data) return { onBreak: false };

  return { onBreak: true, endsAt: data.ends_at };
}

export async function setBreak(userId, short) {
  if (!userId) throw new Error("Required: userId");
  const now = new Date();
  const length = short ? 5 : 30;
  const startedAt = now.toISOString();
  const endsAt = new Date(now.getTime() + length * 60 * 1000).toISOString();

  const { error } = await supabase.from("breaks").insert([
    {
      user_id: userId,
      started_at: startedAt,
      ends_at: endsAt,
    },
  ]);

  if (error) {
    alert(`Soemthing's gone wrong: ${error.message}`);
  }
}
