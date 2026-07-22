import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressGauge from "../components/ProgressGauge";
import StreakDetail from "../components/StreakDetail";
import { Button, Card } from "react-bootstrap";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useOutletContext } from "react-router-dom";

export default function User() {
  const [displayName, setDisplayName] = useState("");
  const { userId, userName } = useOutletContext();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error: ", error.message);
  };

  const addDisplayName = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.updateUser({
      data: { display_name: displayName },
    });
  };

  return (
    <>
      <Header title="USER" />

      <Container className="p-0">
        <Row className="mb-2">
          <Col>☑️ MARKED AS DONE</Col>
        </Row>
        <Row>
          <Col>
            <ProgressGauge today={true} value={4} />
          </Col>
          <Col>
            <ProgressGauge today={false} value={13} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>Streaks</Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <StreakDetail type="current_streak" />
          </Col>
          <Col>
            <StreakDetail type="longest_streak" />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Text className="text-start p-3">
                <Form onSubmit={addDisplayName}>
                  <Form.Group>
                    <Form.Label>Change display name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={userName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    ></Form.Control>
                    <Button onClick={addDisplayName} className="my-2">
                      Update name
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <Button
                variant="Link"
                className="text-start text-secondary"
                onClick={handleLogOut}
              >
                Log out
              </Button>
              <Link
                to="/login"
                state={{ view: "resetPassword" }}
                className="text-start text-secondary p-1 mx-2 text-decoration-none"
              >
                Reset password
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
