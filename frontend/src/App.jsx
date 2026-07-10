import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/about">About</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

/** Reuse this soon!

  import { usePushSubscription } from "./hooks/usePushSubscription";
  import { scheduleNotification } from "./services/notifications";
  import { PushControls } from "./components/PushSetup";
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
*/
