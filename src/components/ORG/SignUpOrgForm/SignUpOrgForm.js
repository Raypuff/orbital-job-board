import React, { useRef, useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import styles from "./SignUpOrgForm.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useStore } from "../../../contexts/StoreContext";

const SignUpOrgForm = () => {
  //ref values to access form data
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  //imported methods from firebase authentication
  const { signup, logout, sendEmailVerification } = useAuth();

  //initializing useStates for signup
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    //prevent page from refreshing
    event.preventDefault();

    //resetting signup STATES
    setMessage("");
    setError("");

    //checking for errors in code
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      //start of signup process
      setLoading(true);

      //firebase side methods
      await signup(emailRef.current.value, passwordRef.current.value);
      await sendEmailVerification();
      await logout();

      //set message to signify signup is successful
      setMessage("Sign up successful!");

      //creating variables to send over through http request
      const id = emailRef.current.value;

      //send account to backend
      const body = { id };
      const response = await fetch(
        "http://volunteer-ccsgp-backend.herokuapp.com/organization_accounts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
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
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Sign up as an organization</Card.Header>
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
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else
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
                  Your password must be at least 6 characters long
                </Form.Text>
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
              <Button disabled={loading} variant="primary" type="submit">
                Sign up
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
              Already have an organization account?{" "}
              <Link to="/sign-in-organization">Sign in here!</Link>
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SignUpOrgForm;
