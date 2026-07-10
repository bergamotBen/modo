import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import AddTask from "./components/AddTask";

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOpen = () => setShowAddModal(true);
  const handleClose = () => setShowAddModal(false);

  return (
    <main className="mx-4">
      <Outlet />

      <Navbar fixed="bottom">
        <Container className="p-4">
          <Navbar.Brand href="/">MODO</Navbar.Brand>
          <Nav>
            <Button
              variant="Link"
              className="nav-link text-secondary"
              onClick={handleOpen}
            >
              ADD
            </Button>
            <Nav.Link href="/done" className="text-secondary">
              DONE
            </Nav.Link>
            <Nav.Link href="/to-do" className="text-secondary">
              TODO
            </Nav.Link>
            <Nav.Link href="/stats" className="text-secondary">
              STATS
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <AddTask showModal={showAddModal} handleClose={handleClose} />
    </main>
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
