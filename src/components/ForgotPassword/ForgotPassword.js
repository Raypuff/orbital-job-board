import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "./ForgotPassword.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      console.log(currentUser);
    } catch (e) {
      setError("Failed to reset password");
      console.log(e);
    }
    setLoading(false);
  }

  return (
    <div className={styles.formPage}>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
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

        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button disabled={loading} variant="primary" type="submit">
          Reset Password
        </Button>
        <div>
          <Link to="sign_in">Login</Link>
        </div>
      </Form>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
