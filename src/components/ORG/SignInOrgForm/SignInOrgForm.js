import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./SignInOrgForm.module.css";

const SignInOrgForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
      console.log(currentUser);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/user-not-found") {
        setError("There is no account associated with this email.");
      } else {
        setError("Failed to sign in");
      }
    }
    setLoading(false);
    window.location.reload(false);
  }

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Sign in as an organization</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Organization email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} variant="primary" type="submit">
                Sign in
              </Button>
            </Form>
            <Card.Text />
            {error && <Alert variant="danger">{error}</Alert>}
            <Card.Text />
            <Card.Text>
              <Link to="/forgot-password-organization">Forgot Password?</Link>
            </Card.Text>
            <Card.Text />
            <Card.Footer>
              Representing your organization and interested in posting a
              volunteer opportunity?{" "}
              <Link to="/sign-up-organization">Sign up here!</Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SignInOrgForm;
