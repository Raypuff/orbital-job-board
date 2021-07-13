//IMPORTS
//React Hooks
import { useRef, useState } from "react";
//Bootstrap
import { Card, Form, Button, Alert } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
//React Router
import { Link, useHistory } from "react-router-dom";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
//CSS Modules
import styles from "./SignInOrgForm.module.css";

const SignInOrgForm = () => {
	//USESTATES
	//Error message for signing in
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	//Toggle for clicking the eyeball to show password
	const [showPassword, setShowPassword] = useState(false);

	//CUSTOM HOOKS
	//Refs for form
	const emailRef = useRef();
	const passwordRef = useRef();
	//API call to sign in
	const { login } = useAuth();
	const history = useHistory();

	//FUNCTIONS
	//To submit form to sign in
	async function handleSubmit(event) {
		event.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(
				emailRef.current.value,
				passwordRef.current.value,
				"organization"
			);
			history.push("/");
			window.location.reload(false);
		} catch (err) {
			if (err.code === "auth/wrong-password") {
				setError("Incorrect password");
			} else if (
				err.code === "auth/user-not-found" ||
				err.message === "wrong-account-type"
			) {
				setError("There is no organization account associated with this email");
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
					<Card.Header as="h6">Sign in as an organization</Card.Header>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Organization email address</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
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
						{loading && <Alert variant="primary">Signing you in...</Alert>}
						{error && <Alert variant="danger">{error}</Alert>}
						<Card.Text />
						<Card.Text>
							<Link to="/forgot-password-organization">Forgot Password?</Link>
						</Card.Text>
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

export default SignInOrgForm;
