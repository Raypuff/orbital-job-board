import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "./SignUpForm.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";

const SignUpForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup, logout, sendEmailVerification } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { addItem } = useStore();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await sendEmailVerification();
      await logout();
      setMessage(
        "Signed up successfully. Please check your email for a verification message."
      );
      await addItem(
        {
          dateCreated: new Date().toDateString(),
        },
        "organization_accounts",
        emailRef.current.value
      );
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      }
      console.log(err.code);
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          <Form.Text id="passwordReq" muted>
            Your password must be at least 6 characters long.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPasswordConfirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password Confirmation"
            ref={passwordConfirmRef}
            required
          />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button disabled={loading} variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/sign_in">Log in</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
