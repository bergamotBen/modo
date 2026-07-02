import { useState, useEffect } from "react";
import { subscribeToPush } from "../lib/push";

export function usePushSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkExistingSubscription() {
      try {
        // Check service workers are ready
        const registration = await navigator.serviceWorker.ready;
        // Check for an existing subscription
        const subscription = await registration.pushManager.getSubscription();
        // 3. If subscription is not null, device is already registered
        setIsSubscribed(!!subscription);
      } catch (error) {
        console.error("Error checking existing push subscription:", error);
      } finally {
        setLoading(false);
      }
    }

    checkExistingSubscription();
  }, []);

  const subscribe = async () => {
    setLoading(true);
    try {
      await subscribeToPush();
      setIsSubscribed(true);
    } catch (error) {
      setIsSubscribed(false);
    } finally {
      setLoading(false);
    }
  };
  return { isSubscribed, loading, subscribe };
}
