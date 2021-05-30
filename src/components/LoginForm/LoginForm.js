import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "./LoginForm.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {
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
  }

  return (
    <div className={styles.formPage}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Organization email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailRef}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button disabled={loading} variant="primary" type="submit">
          Login
        </Button>
        <div>
          <Link to="/forgot_password">Forgot Password?</Link>
        </div>
      </Form>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
