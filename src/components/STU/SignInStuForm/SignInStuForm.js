import React, { useState, useRef } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "./SignInStuForm.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const SignInStuForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { loginStu, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await loginStu(emailRef.current.value, passwordRef.current.value);
      history.push("/");
      window.location.reload(false);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (
        err.code === "auth/user-not-found" ||
        err.message === "wrong-account-type"
      ) {
        setError("There is no student account associated with this email");
      } else {
        setError("Failed to sign in");
        console.log(err.message);
      }
    }
    setLoading(false);
  }

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Sign in as an NUS student</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
                <Form.Text className="text-muted">
                  Please sign in with your NUS email address
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} variant="primary" type="submit">
                Sign in
              </Button>
            </Form>
            <Card.Text />
            {error && <Alert variant="danger">{error}</Alert>}
            <Card.Text />
            <Card.Text />
            <Card.Text>
              <Link to="/forgot-password-student">Forgot Password?</Link>
            </Card.Text>
            <Card.Text />
            <Card.Footer>
              Interested in applying for volunteer opportunities?{" "}
              <Link to="/sign-up-student">Sign up here!</Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SignInStuForm;
