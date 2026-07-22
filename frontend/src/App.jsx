import { Outlet, useLocation, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import { supabase } from "./lib/supabase";
import Login from "./pages/Login";
import {
  PersonCircle,
  PlusCircle,
  CheckCircle,
  ExclamationCircle,
} from "react-bootstrap-icons";

export default function App() {
  const [session, setSession] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleOpen = () => setShowAddModal(true);
  const handleClose = () => setShowAddModal(false);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(session);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="mx-4">
      {session ? (
        <>
          <Outlet
            context={{
              userId: session.user.id,
              userName: session.user.user_metadata.display_name,
            }}
          />

          <Navbar fixed="bottom">
            <Container className="p-4">
              <Navbar.Brand href="/">MODO</Navbar.Brand>
              <Nav activeKey={location.pathname}>
                <Button
                  variant="Link"
                  className="nav-link text-secondary"
                  onClick={handleOpen}
                >
                  <PlusCircle size={32} className="text-secondary" />
                </Button>
                <Nav.Link
                  as={Link}
                  to="/to-do"
                  eventKey="/to-do"
                  className="text-secondary"
                >
                  <ExclamationCircle size={32} className="text-secondary" />
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/done"
                  eventKey="/done"
                  className="text-secondary"
                >
                  <CheckCircle size={32} className="text-secondary" />
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/user"
                  eventKey="/user"
                  className="text-secondary"
                >
                  <PersonCircle size={32} className="text-secondary" />
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <AddTask
            showModal={showAddModal}
            handleClose={handleClose}
            userId={session?.user?.id}
          />
        </>
      ) : (
        <Login />
      )}
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
