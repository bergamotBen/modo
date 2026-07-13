import Header from "../components/Header";
import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const pageViews = {
  logIn: {
    title: "LOG IN",
    msg: "Log in to MODO.",
    elements: ["msg", "username", "password"],
  },
  signUp: {
    title: "SIGN UP",
    msg: "Create a MODO account.",
    elements: ["msg", "username", "password", "validatePassword"],
  },
  signOut: {
    title: "SIGN OUT",
    msg: "You have been signed out",
    elements: ["msg"],
  },
  resetPassword: {
    title: "RESET PASSWORD",
    msg: "Forgotten your MODO password?",
    elements: ["msg"],
  },
};

export default function Login() {
  const location = useLocation();
  const initialView = location.state?.view || "logIn";
  const [pageView, setPageView] = useState(pageViews[initialView]);
  return (
    <>
      <Header title={pageView.title} />
      <Card>
        <Card.Body>
          {pageView.msg}

          <Form>
            {pageView.elements.includes("username") ? (
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  autoFocus
                ></Form.Control>
              </Form.Group>
            ) : null}

            {pageView.elements.includes("password") ? (
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            ) : null}

            {pageView.elements.includes("validatePassword") ? (
              <Form.Group className="mb-3" controlId="retypePassword">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            ) : null}
            <Button variant="primary" type="submit">
              {pageView.title}
            </Button>
          </Form>

          {pageView === pageViews.logIn ? (
            <p onClick={() => setPageView(pageViews.signUp)}>
              New user? Sign up
            </p>
          ) : null}
          {pageView === pageViews.signUp ? (
            <p onClick={() => setPageView(pageViews.logIn)}>
              Already got an account? Log in
            </p>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
}
