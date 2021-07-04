import EditProfileOrg from "../EditProfileOrg";
import { Card, Form, Button, Tab, Nav, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ArrowLeft, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import styles from "./YourProfileOrg.module.css";
import * as Yup from "yup";
import { Formik } from "formik";
import { useAuth } from "../../../contexts/AuthContext";

const YourProfileOrg = () => {
	const [edit, setEdit] = useState(false);
	const { currentUser, userVerified } = useAuth();
	const [userData, setUserData] = useState(null);
	const { width } = useWindowDimensions();
	const [mobileActiveView, setMobileActiveView] = useState(false);
	const [successPassword, setSuccessPassword] = useState();
	const [errorPassword, setErrorPassword] = useState();
	const [showOldPw, setShowOldPw] = useState(false);
	const [showNewPw, setShowNewPw] = useState(false);
	const [showCfmPw, setShowCfmPw] = useState(false);

	function onEdit() {
		setEdit(true);
	}

	const getUser = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/organization-accounts/" +
				currentUser.email,
			{}
		);
		const jsonData = await response.json();
		setUserData(jsonData);
	};

	useEffect(() => {
		getUser();
	}, [edit]);

	const changePasswordSubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		handleSubmit(values);

		async function handleSubmit(values) {
			setSuccessPassword("");
			setErrorPassword("");

			try {
				console.log(`Old password: ${values.passwordOld}`);
				console.log(`New password: ${values.passwordNew}`);
				console.log(`Confirm password: ${values.passwordConfirm}`);
				setSuccessPassword("Password changed successfully!");
				resetForm();
				setSubmitting(false);
			} catch (err) {
				setErrorPassword("Failed to update your password");
				console.log(err);
			}
		}
	};

	return (
		<div className={styles.container}>
			<Tab.Container defaultActiveKey={width < 576 ? "" : "first"}>
				<Row>
					<Col sm={3} className={mobileActiveView ? styles.displayNone : ""}>
						<Nav variant="pills" className="flex-column">
							<Nav.Item>
								<Nav.Link
									eventKey="first"
									className={styles.navLink}
									active={width < 576 ? false : null}
									onClick={() => {
										if (width < 576) {
											setMobileActiveView(true);
										}
									}}
								>
									Profile details
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									eventKey="second"
									className={styles.navLink}
									active={width < 576 ? false : null}
									onClick={() => {
										if (width < 576) {
											setMobileActiveView(true);
										}
									}}
								>
									Change password
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					{(width > 577 || (mobileActiveView && width < 576)) && (
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									{edit ? (
										<EditProfileOrg
											setEdit={setEdit}
											mobileActiveView={mobileActiveView}
											setMobileActiveView={setMobileActiveView}
											width={width}
										/>
									) : (
										<>
											<Card bg="light" text="dark">
												<Card.Header
													as="h5"
													className="d-flex align-items-center"
												>
													{mobileActiveView && width < 576 && (
														<ArrowLeft
															style={{ marginRight: "1rem" }}
															onClick={() => setMobileActiveView(false)}
														/>
													)}
													Organization Details
												</Card.Header>
												<Card.Body>
													<Form onSubmit={onEdit}>
														<Form.Group controlId="formType">
															<Form.Label>Organization type:</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.type : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formName">
															<Form.Label>Organization name</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.name : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<div
															className={
																userData &&
																userData.type === "Non-NUS Organization"
																	? styles.display
																	: styles.displayNone
															}
														>
															<Form.Group controlId="formUen">
																<Form.Label>
																	Organization UEN, Charity registration number
																	or Society registration number
																	<Form.Text className="text-muted">
																		Only applicable for Non-NUS Organizations
																	</Form.Text>
																</Form.Label>
																<Form.Control
																	placeholder={
																		userData !== null ? userData.uen : ""
																	}
																	readOnly
																	onClick={onEdit}
																/>
															</Form.Group>
														</div>
														<Form.Group controlId="formEmail">
															<Form.Label>
																Email address of organization
															</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.id : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formPocName">
															<Form.Label>Name of contact person</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.pocName : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formPocNo">
															<Form.Label>
																Mobile number of contact person
															</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.pocNo : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formPocEmail">
															<Form.Label>
																Email address of contact person
															</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.pocEmail : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>

														<Button variant="primary" type="submit">
															Edit profile
														</Button>
													</Form>
												</Card.Body>
											</Card>
											<Card className="mt-4">
												<Card.Header
													as="h5"
													className="d-flex align-items-center"
												>
													{mobileActiveView && width < 576 && (
														<ArrowLeft
															style={{ marginRight: "1rem" }}
															onClick={() => setMobileActiveView(false)}
														/>
													)}
													Additional Information
												</Card.Header>
												<Card.Body>
													Verification status:{" "}
													<span style={{ fontWeight: 600 }}>
														{userVerified ? "Verified" : "Unverified"}
													</span>
													{!userVerified && (
														<div
															style={{
																textDecoration: "underline",
																color: "#193f76",
															}}
															onClick={() => console.log("zech")}
														>
															Click here to resend a verification email
														</div>
													)}
												</Card.Body>
											</Card>
										</>
									)}
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<div className="d-flex justify-content-center align-items-center">
										<Card bg="light" text="dark" style={{ width: "23rem" }}>
											<Card.Header
												as="h5"
												className="d-flex align-items-center"
											>
												{mobileActiveView && width < 576 && (
													<ArrowLeft
														style={{ marginRight: "1rem" }}
														onClick={() => setMobileActiveView(false)}
													/>
												)}
												Change password
											</Card.Header>
											<Card.Body>
												<Formik
													initialValues={{
														passwordOld: "",
														passwordNew: "",
														passwordConfirm: "",
													}}
													validationSchema={validationSchema}
													onSubmit={changePasswordSubmit}
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
															<Form.Group>
																<Form.Label>Old Password</Form.Label>
																<Form.Control
																	name="passwordOld"
																	type={showOldPw ? "text" : "password"}
																	value={values.passwordOld}
																	onChange={handleChange}
																	onBlur={handleBlur}
																	isValid={
																		touched.passwordOld && !errors.passwordOld
																	}
																	isInvalid={
																		touched.passwordOld && errors.passwordOld
																	}
																/>
																<div
																	className={
																		touched.passwordOld
																			? styles.eyeError
																			: styles.eye
																	}
																	onClick={() => setShowOldPw(!showOldPw)}
																>
																	{showOldPw ? <EyeSlashFill /> : <EyeFill />}
																</div>

																<Form.Control.Feedback type="invalid">
																	{errors.passwordOld}
																</Form.Control.Feedback>
															</Form.Group>
															<Form.Group>
																<Form.Label>New Password</Form.Label>
																<Form.Control
																	name="passwordNew"
																	type={showNewPw ? "text" : "password"}
																	value={values.passwordNew}
																	onChange={handleChange}
																	onBlur={handleBlur}
																	isValid={
																		touched.passwordNew && !errors.passwordNew
																	}
																	isInvalid={
																		touched.passwordNew && errors.passwordNew
																	}
																/>
																<div
																	className={
																		touched.passwordNew
																			? styles.eyeError
																			: styles.eye
																	}
																	onClick={() => setShowNewPw(!showNewPw)}
																>
																	{showNewPw ? <EyeSlashFill /> : <EyeFill />}
																</div>

																<Form.Control.Feedback type="invalid">
																	{errors.passwordNew}
																</Form.Control.Feedback>
															</Form.Group>
															<Form.Group>
																<Form.Label>Confirm Password</Form.Label>
																<Form.Control
																	name="passwordConfirm"
																	type={showCfmPw ? "text" : "password"}
																	value={values.passwordConfirm}
																	onChange={handleChange}
																	onBlur={handleBlur}
																	isValid={
																		touched.passwordConfirm &&
																		!errors.passwordConfirm
																	}
																	isInvalid={
																		touched.passwordConfirm &&
																		errors.passwordConfirm
																	}
																/>
																<div
																	className={
																		touched.passwordConfirm
																			? styles.eyeError
																			: styles.eye
																	}
																	onClick={() => setShowCfmPw(!showCfmPw)}
																>
																	{showCfmPw ? <EyeSlashFill /> : <EyeFill />}
																</div>

																<Form.Control.Feedback type="invalid">
																	{errors.passwordConfirm}
																</Form.Control.Feedback>
															</Form.Group>
															<div className="d-flex justify-content-center align-items-center">
																<Button
																	variant="primary"
																	type="submit"
																	disabled={isSubmitting || successPassword}
																>
																	{isSubmitting
																		? "Submitting..."
																		: successPassword
																		? "Password changed"
																		: "Change password"}
																</Button>
															</div>
														</Form>
													)}
												</Formik>
											</Card.Body>
										</Card>
									</div>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					)}
				</Row>
			</Tab.Container>
		</div>
	);
};

export default YourProfileOrg;

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

const validationSchema = Yup.object().shape({
	passwordOld: Yup.string().required("Please enter your old password"),
	passwordNew: Yup.string()
		.required("Please enter your new password")
		.matches(
			/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
			"Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special case character"
		),
	passwordConfirm: Yup.string()
		.required("Please confirm your new password")
		.when("passwordNew", {
			is: (password) => password && password.length > 0,
			then: Yup.string().oneOf(
				[Yup.ref("passwordNew")],
				"Your passwords do not match"
			),
		}),
});
