import { supabase } from "./supabase";

// Helper function: Convert VAPID key from Base64 to a Uint8Array
export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribeToPush = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error("Permission denied");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User must be logged in to enable notifications");

  const registration = await navigator.serviceWorker.ready;
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  const convertedPublicKey = urlBase64ToUint8Array(publicKey);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedPublicKey,
  });

  const subJSON = subscription.toJSON();

  // Upsert matching on the text 'endpoint' column!
  const { error } = await supabase.from("push_subscriptions").upsert(
    [
      {
        user_id: user.id,
        endpoint: subscription.endpoint, // Pure text string for clean matching
        subscription: subJSON,
      },
    ],
    { onConflict: "endpoint" },
  );

  if (error) throw error;
  return subscription;
};
