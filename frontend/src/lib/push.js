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

  const registration = await navigator.serviceWorker.ready;
  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  const convertedPublicKey = urlBase64ToUint8Array(publicKey);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedPublicKey,
  });

  const { error } = await supabase
    .from("push_subscriptions")
    .insert([{ subscription: subscription.toJSON() }]);

  if (error) {
    throw error;
  }
  return subscription;
};
