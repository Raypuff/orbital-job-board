import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SignUpStuForm.module.css";
import { useAuth } from "../../../contexts/AuthContext";

const SignUpStuForm = () => {
  //importing methods from auth and store
  const { signup, logout, sendEmailVerification } = useAuth();

  //ref values to access form data
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  //useStates for form
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    //prevent page refresh
    event.preventDefault();

    //reset states of messages
    setMessage("");
    setError("");

    //check if passwords match and email is nus student email
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } else if (!emailRef.current.value.includes("@u.nus.edu")) {
      return setError("Not an NUS student email");
    }

    const id = emailRef.current.value;

    try {
      //loading to signify start of process
      setLoading(true);

      //firebase side methods
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        "student"
      );
      await sendEmailVerification();
      await logout();
      setMessage("Sign up successful");

      //send account to backend
      const body = { id };
      const response = await fetch("http://localhost:5000/student_accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response || "Failure");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use");
      }
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Sign up as an NUS student</Card.Header>
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
                  You can only sign up with your NUS email address
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
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
            <Card.Text />

            {error && <Alert variant="danger">{error}</Alert>}
            {message && (
              <Alert variant="success">
                <Alert.Heading as="h6">{message}</Alert.Heading>
                <hr />
                <p className="mb-0">
                  Please check your inbox for a verification email
                </p>
              </Alert>
            )}

            <Card.Text />
            <Card.Footer>
              Already have an account?{" "}
              <Link to="/sign-in-student">Sign in here!</Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SignUpStuForm;
