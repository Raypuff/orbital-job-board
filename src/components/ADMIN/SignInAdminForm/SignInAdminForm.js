import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import styles from "./SignInAdminForm.module.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const SignInAdminForm = () => {
	//initialize refs to access form data
	const emailRef = useRef();
	const passwordRef = useRef();

	//history to push users back to landing page when done with sign in
	const history = useHistory();

	//useStates for use during signin
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	//import login methods from authcontext
	const { loginAdmin } = useAuth();

	async function handleSubmit(event) {
		//prevent page refresh
		event.preventDefault();

		try {
			//reset error message
			setError("");

			//start loading state to signify start of sign in
			setLoading(true);

			await loginAdmin(emailRef.current.value, passwordRef.current.value);
			history.push("/");
			window.location.reload(false);
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
				<Card bg="light" text="dark" style={{ width: "23rem" }}>
					<Card.Header as="h6">Sign in as a CCSGP administrator</Card.Header>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
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
