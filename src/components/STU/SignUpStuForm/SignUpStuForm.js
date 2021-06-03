import { Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SignUpStuForm.module.css";

const SignUpStuForm = () => {
  async function handleSubmit(event) {
    console.log("your turn zech");
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
                  // ref={emailRef}
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
