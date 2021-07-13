//IMPORTS
//React Hooks
import { useRef, useState } from "react";
//Bootstrap
import { Card, Form, Button, Alert } from "react-bootstrap";
//React Router
import { Link } from "react-router-dom";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
//CSS Modules
import styles from "./ForgotPasswordOrg.module.css";

const ForgotPasswordOrg = () => {
	//USESTATES
	//Error message, success message and if the form is submitting
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	//CUSTOM HOOKS
	//Ref to refer to email field
	const emailRef = useRef();
	//API Call to reset password
	const { resetPassword } = useAuth();

	//FUNCTIONS
	//Submit forgot password email
	async function handleSubmit(event) {
		event.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value, "organization");
			setMessage(
				"We have sent you an email with instructions on how to reset your password."
			);
		} catch (err) {
			if (
				err.code === "auth/user-not-found" ||
				err.message === "wrong-account-type"
			) {
				setError(
					"This is no organization account associated with this email address"
				);
			} else {
				setError("Failed to reset password");
			}
		}
		setLoading(false);
	}

	return (
		<div className={styles.formBG}>
			<div className={styles.formContainer}>
				<Card bg="light" text="dark" className={styles.cardContainer}>
					<Card.Header as="h6">Reset your organization password</Card.Header>
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
									Enter the email address that you used to register your account
								</Form.Text>
							</Form.Group>
							<Button disabled={loading} variant="primary" type="submit">
								Reset Password
							</Button>
						</Form>
						<Card.Text />
						{error && <Alert variant="danger">{error}</Alert>}
						{message && <Alert variant="success">{message}</Alert>}
						<Card.Text />
						<Card.Footer>
							Representing your organization and interested in posting a
							volunteer opportunity?{" "}
							<Link to="/sign-up-organization">Sign up here!</Link>
						</Card.Footer>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default ForgotPasswordOrg;
