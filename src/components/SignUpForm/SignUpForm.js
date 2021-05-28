import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./SignUpForm.module.css";

function SignUpOrg(event) {
  event.preventDefault();
  console.log("Email: " + event.target[0].value);
  console.log("Password: " + event.target[1].value);
  console.log("Password Confirmation: " + event.target[2].value)
}

const SignUpForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <div className={styles.formPage}>
      <Form onSubmit={SignUpOrg}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Organization email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordConfirmRef} required/>
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

export default SignUpForm;
