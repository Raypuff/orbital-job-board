import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import styles from "./SignUpOrgForm.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const SignUpOrgForm = () => {
  //imported methods from firebase authentication
  const { signup, logout, sendEmailVerification } = useAuth();

  //importing useHistory to redirect after signing up
  const history = useHistory();

  //initializing useStates for signup
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //for showing password
  const [showPassword, setShowPassword] = useState(false);
  const [showCfmPassword, setShowCfmPassword] = useState(false);

  const mySubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    handleSubmit(values);

    async function handleSubmit(values) {
      //resetting signup STATES
      setMessage("");
      setError("");

      try {
        //firebase side methods
        await signup(values.email, values.password, "organization");
        setMessage("Sign up successful!");
        history.push("/sign-up-success");
        await sendEmailVerification();

        //creating variables to send over through http request
        const id = values.email;

        //send account to backend
        const body = { id };
        await fetch(
          process.env.REACT_APP_BACKEND_URL + "/organization-accounts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        //set message to signify signup is successful
        resetForm();
        setSubmitting(false);
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          setError("This email address is already in use");
        }
        setSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.formBG}>
      <div className={styles.formContainer}>
        <Card bg="light" text="dark" style={{ width: "23rem" }}>
          <Card.Header as="h6">Sign up as an organization</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                email: "",
                password: "",
                passwordConfirm: "",
              }}
              validationSchema={validationSchema}
              onSubmit={mySubmit}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Organization email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <div
                      className={
                        touched.password ? styles.eyeError : styles.eye
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlashFill /> : <EyeFill />}
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      name="passwordConfirm"
                      type={showCfmPassword ? "text" : "password"}
                      value={values.passwordConfirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.passwordConfirm && !errors.passwordConfirm
                      }
                      isInvalid={
                        touched.passwordConfirm && errors.passwordConfirm
                      }
                    />
                    <div
                      className={
                        touched.passwordConfirm ? styles.eyeError : styles.eye
                      }
                      onClick={() => setShowCfmPassword(!showCfmPassword)}
                    >
                      {showCfmPassword ? <EyeSlashFill /> : <EyeFill />}
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirm}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    disabled={isSubmitting}
                    variant="primary"
                    type="submit"
                  >
                    Sign up
                  </Button>
                  <Card.Text />
                  {error && (
                    <Alert variant="danger">
                      <Alert.Heading as="h6">{error}</Alert.Heading>
                      <hr />
                      <p className="mb-0">
                        If you have forgotten your password, you can reset your
                        password{" "}
                        <Link to="/forgot-password-organization">here</Link>
                      </p>
                    </Alert>
                  )}
                  {isSubmitting && (
                    <Alert variant="primary">Signing you up...</Alert>
                  )}
                  {message && (
                    <Alert variant="success">
                      <Alert.Heading as="h6">{message}</Alert.Heading>
                      <hr />
                      <p className="mb-0">
                        Please check your inbox for a verification email
                      </p>
                    </Alert>
                  )}
                </Form>
              )}
            </Formik>
            <Card.Text />
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special case character"
    ),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => password && password.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Your passwords do not match"
      ),
    }),
});
