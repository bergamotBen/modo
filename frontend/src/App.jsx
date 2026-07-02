import { usePushSubscription } from "./hooks/usePushSubscription";
import { scheduleNotification } from "./services/notifications";
import { PushControls } from "./components/PushSetup";
export default function App() {
  const { isSubscribed, loading, subscribe } = usePushSubscription();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>MODO</h1>

      <PushControls
        isSubscribed={isSubscribed}
        loading={loading}
        subscribe={subscribe}
      />

      <button
        onClick={() => {
          scheduleNotification(
            "Take a little break now, you've earned it.",
            25,
          );
        }}
      >
        Start
      </button>
    </div>
  );
}
