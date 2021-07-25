//IMPORTS
//React Hooks
import { useRef, useState } from "react";
//Bootstrap
import { Card, Form, Button, Alert } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//React Router
import { useHistory } from "react-router-dom";
//Auth
import { useAuth } from "../../../contexts/AuthContext";
//CSS Modules
import styles from "./SignInAdminForm.module.css";

const SignInAdminForm = () => {
  //USESTATES
  //UseStates for use during signin
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //UseState for showing password
  const [showPassword, setShowPassword] = useState(false);

  //CUSTOM HOOKS
  //Refs for form data
  const emailRef = useRef();
  const passwordRef = useRef();
  //React router history to push users back to landing page when done with sign in
  const history = useHistory();
  //Import login methods from authcontext
  const { login } = useAuth();

  //FUNCTIONS
  //Sign in function
  async function handleSubmit(event) {
    //Prevent page refresh
    event.preventDefault();

    try {
      //Reset error message
      setError("");
      //Start loading state to signify start of sign in
      setLoading(true);

      await login(emailRef.current.value, passwordRef.current.value, "admin");
      history.push("/");
      // window.location.reload(false);
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (
        err.code === "auth/user-not-found" ||
        err.message === "wrong-account-type"
      ) {
        setError("There is no account associated with this email.");
      } else {
        setError("Failed to sign in");
      }
    }
    setLoading(false);
  }
  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" className={styles.cardContainer}>
          <Card.Header as="h6">Sign in as a CCSGP administrator</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  name="email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
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
              <Button disabled={loading} variant="primary" type="submit">
                Sign in
              </Button>
            </Form>
            <Card.Text />
            {error && <Alert variant="danger">{error}</Alert>}
            <Card.Text />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SignInAdminForm;
