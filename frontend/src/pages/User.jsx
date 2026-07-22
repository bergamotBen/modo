import Header from "../components/Header";
import { InputGroup } from "react-bootstrap";
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
import { ArrowCounterclockwise, BoxArrowRight } from "react-bootstrap-icons";
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
        <Row className="mb-3">
          <Col>Tasks complete</Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <ProgressGauge today={true} value={4} />
          </Col>
          <Col>
            <ProgressGauge today={false} value={13} />
          </Col>
        </Row>
        <Row className="mb-3">
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
        <hr className="my-3" />
        <Row>
          <Col>
            <Form onSubmit={addDisplayName}>
              <Form.Group>
                <Form.Label className="mb-3">Change display name</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder={userName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  ></Form.Control>
                  <Button onClick={addDisplayName}>Update name</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Row>
            <Link
              to="/login"
              state={{ view: "resetPassword" }}
              className="text-start text-secondary p-1 mx-2 text-decoration-none"
            >
              <ArrowCounterclockwise
                className="text-secondary me-2"
                size={20}
              />
              Reset password
            </Link>
          </Row>
          <Button
            variant="Link"
            className="text-start text-secondary"
            onClick={handleLogOut}
          >
            <BoxArrowRight className="text-secondary me-2" size={20} />
            Log out
          </Button>
        </Row>
      </Container>
    </>
  );
}
