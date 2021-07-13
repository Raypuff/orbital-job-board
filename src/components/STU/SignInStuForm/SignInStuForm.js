//IMPORTS
//React Hooks
import { useState, useRef } from "react";
//Bootstrap
import { Card, Button, Form, Alert } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
//React Router
import { Link, useHistory } from "react-router-dom";
//CSS Modules
import styles from "./SignInStuForm.module.css";

const SignInStuForm = () => {
  //USESTATES
  //Error message for signing up
  const [error, setError] = useState("");
  //Loading when submitting
  const [loading, setLoading] = useState(false);
  //Toggle for showing password as text
  const [showPassword, setShowPassword] = useState(false);

  //CUSTOM HOOKS
  //Refs to refer to form fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  //History to push to landing page after signing in
  const history = useHistory();

  //FUNCTIONS
  //Submit form to sign in
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value, "student");
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
                <Form.Control
                  data-testid="email"
                  type="email"
                  ref={emailRef}
                  required
                />
                <Form.Text className="text-muted">
                  Please sign in with your NUS email address
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  data-testid="passwrd"
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                />
                <div
                  className={styles.eye}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </div>
              </Form.Group>
              <Button
                date-testid="sign in"
                disabled={loading}
                variant="primary"
                type="submit"
              >
                Sign in
              </Button>
            </Form>
            <Card.Text />
            {loading && <Alert variant="primary">Signing you in...</Alert>}
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
