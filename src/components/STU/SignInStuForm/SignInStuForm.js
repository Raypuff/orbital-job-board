import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SignInStuForm.module.css";

const SignInStuForm = () => {
  async function handleSubmit(event) {
    console.log("your turn zech");
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
                  type="email"
                  placeholder="Enter email"
                  // ref={emailRef}
                  required
                />
                <Form.Text className="text-muted">
                  Please sign in with your NUS email address
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  // ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button
                // disabled={loading}
                variant="primary"
                type="submit"
              >
                Sign in
              </Button>
            </Form>
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
