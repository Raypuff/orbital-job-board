import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./ForgotPasswordStu.module.css";

const ForgotPasswordStu = () => {
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
      await resetPassword(emailRef.current.value, "student");
      setMessage(
        "We have sent you an email with instructions on how to reset your password."
      );
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.message === "wrong-account-type"
      ) {
        setError(
          "This is no student account associated with this email address"
        );
      } else {
        setError(
          "There has been an error in resetting your password. Please contact an administrator for help"
        );
        console.log(err);
      }
    }
    setLoading(false);
  }

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Reset your password</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                  required
                />
                <Form.Text className="text-muted">
                  Enter the NUS email address that you used to register your
                  account
                </Form.Text>
              </Form.Group>
              <Button disabled={loading} variant="primary" type="submit">
                Reset Password
              </Button>
            </Form>
            <Card.Text />
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

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

export default ForgotPasswordStu;
