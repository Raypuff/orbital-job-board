import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./ForgotPasswordOrg.module.css";

const ForgotPasswordOrg = () => {
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
      setMessage(
        "We have sent you an email with instructions on how to reset your password."
      );
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
            Input the email that you used to register your organization account.
          </Form.Text>
        </Form.Group>

        <Button disabled={loading} variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        Representing your organization and interested in posting a volunteer
        opportunity?
        <br />
        <Link to="/sign-up-organization">Sign up here!</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordOrg;
