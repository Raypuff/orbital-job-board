import { Form, Button } from "react-bootstrap";
import styles from "./LoginForm.module.css";

function loginOrg(event) {
  event.preventDefault();
  console.log("Email: " + event.target[0].value);
  console.log("Password: " + event.target[1].value);
}

const LoginForm = () => {
  return (
    <div className={styles.formPage}>
      <Form onSubmit={loginOrg}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Organization email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
