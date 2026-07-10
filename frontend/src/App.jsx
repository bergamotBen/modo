import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function App() {
  return (
    <div className="app">
      <Navbar>
        <Container>
          <Navbar.Brand>MODO</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
