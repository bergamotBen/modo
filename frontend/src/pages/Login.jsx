import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";

const pageViews = {
  logIn: {
    key: "logIn",
    title: "LOG IN",
    msg: "Log in to MODO.",
    elements: ["msg", "username", "password"],
  },
  signUp: {
    key: "signUp",
    title: "SIGN UP",
    msg: "Create a MODO account.",
    elements: ["msg", "username", "password", "validatePassword"],
  },
  signOut: {
    key: "signOut",
    title: "SIGN OUT",
    msg: "You have been signed out",
    elements: ["msg"],
  },
  resetPassword: {
    key: "resetPassword",
    title: "RESET PASSWORD",
    msg: "Forgotten your MODO password?",
    elements: ["msg"],
  },
};

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialView = location.state?.view || "logIn";
  const [pageView, setPageView] = useState(pageViews[initialView]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created.");
      setPageView(pageViews.logIn);
    }
    setLoading(false);
  };

  return (
    <>
      <Header title={pageView.title} />
      <Card className="mt-4">
        <Card.Body>
          <Card.Text className="mb-4">{pageView.msg}</Card.Text>

          <Form
            onSubmit={pageView.key === "logIn" ? handleLogin : handleSignUp}
          >
            {pageView.elements.includes("username") && (
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
              </Form.Group>
            )}

            {pageView.elements.includes("password") && (
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />
              </Form.Group>
            )}

            {pageView.elements.includes("validatePassword") && (
              <Form.Group className="mb-3" controlId="retypePassword">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Retype Password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            {pageView.key === "logIn" && (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100 mb-3"
                >
                  {loading ? "Logging in..." : "Log In"}
                </Button>

                <p onClick={() => setPageView(pageViews.signUp)}>
                  New user? Sign up
                </p>
              </>
            )}

            {pageView.key === "signUp" && (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100 mb-3"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
                <p onClick={() => setPageView(pageViews.logIn)}>
                  Already got an account? Log in
                </p>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
