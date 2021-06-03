import { Card, Form, Button } from "react-bootstrap";
import styles from "./SignInAdminForm.module.css";

const SignInAdminForm = () => {
  async function handleSubmit(event) {
    console.log("your turn zech");
  }

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Sign in as a CCSGP Administrator</Card.Header>
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
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SignInAdminForm;
