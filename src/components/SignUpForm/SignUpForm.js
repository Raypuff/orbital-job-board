import React, { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import styles from "./SignUpForm.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError("Failed to create an account");
      console.log(err);
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
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
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
