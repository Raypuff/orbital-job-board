import EditProfileStu from "../EditProfileStu";
import { Card, Form, Button, Tab, Nav, Row, Col, Alert } from "react-bootstrap";
import noImage from "../../../assets/noAvatar.png";
import { BeneficiaryTags, SkillTags } from "../../../assets/Tags";
import { LoadingProfile } from "./EmptyStates";
import { useEffect, useState } from "react";
import styles from "./YourProfileStu.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { ArrowLeft, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Formik } from "formik";
import * as Yup from "yup";

const YourProfileStu = () => {
	const [edit, setEdit] = useState(false);
	const {
		currentUser,
		changePassword,
		reauthenticate,
		userVerified,
		sendEmailVerification,
	} = useAuth();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	const { width } = useWindowDimensions();
	const [mobileActiveView, setMobileActiveView] = useState(false);
	const [successPassword, setSuccessPassword] = useState();
	const [errorPassword, setErrorPassword] = useState();
	const [showOldPw, setShowOldPw] = useState(false);
	const [showNewPw, setShowNewPw] = useState(false);
	const [showCfmPw, setShowCfmPw] = useState(false);
	const [timer, setTimer] = useState(60);
	const [startTimer, setStartTimer] = useState(false);
	const [subscriptions, setSubscriptions] = useState({});
	const [successSubscriptions, setSuccessSubscriptions] = useState();
	const [errorSubscriptions, setErrorSubscriptions] = useState();

	function onEdit() {
		setEdit(true);
	}

	const getUser = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/student-accounts/" +
				currentUser.email
		);
		const jsonData = await response.json();
		jsonData.subscriptions = ["Animals", "WebDev"]; // remove this once subscriptions is implemented in userData
		setUserData(jsonData);
		let subs = {};
		console.log(jsonData.subscriptions);
		for (let i = 0; i < BeneficiaryTags.length; i++) {
			if (jsonData.subscriptions.includes(BeneficiaryTags[i])) {
				subs[BeneficiaryTags[i]] = true;
			} else {
				subs[BeneficiaryTags[i]] = false;
			}
		}
		for (let j = 0; j < SkillTags.length; j++) {
			if (jsonData.subscriptions.includes(SkillTags[j])) {
				subs[SkillTags[j]] = true;
			} else {
				subs[SkillTags[j]] = false;
			}
		}
		setSubscriptions(subs);
		setLoading(false);
	};

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [edit]);

	const changePasswordSubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		handleSubmit(values);

		async function handleSubmit(values) {
			setSuccessPassword("");
			setErrorPassword("");

			try {
				await reauthenticate(values.passwordOld);
				await changePassword(values.passwordNew);
				setSuccessPassword("Password changed successfully!");
				resetForm();
			} catch (err) {
				if (err.message === "auth/wrong-password") {
					setErrorPassword("Your old password is incorrect");
				} else {
					setErrorPassword(
						"Failed to update your password due to internal error"
					);
				}
			}
			setSubmitting(false);
			console.log(errorPassword);
		}
	};

	const resendVerification = () => {
		setStartTimer(true);
		sendEmailVerification();
		console.log("sent");
		setTimer(timer - 1);
	};

	useEffect(() => {
		if (startTimer && timer > 0) {
			console.log(timer);
			setTimeout(() => setTimer(timer - 1), 1000);
		} else if (timer === 0) {
			setTimer(60);
			setStartTimer(false);
		}
	}, [timer]);

	const saveSubscriptions = (values, { setSubmitting }) => {
		setSubmitting(true);
		handleSubmit(values);

		async function handleSubmit(values) {
			setSuccessSubscriptions("");
			setErrorSubscriptions("");
			try {
				console.log(values);
				setSuccessSubscriptions("Subscriptions updated successfully!");
				setSubmitting(false);
			} catch (err) {
				setErrorSubscriptions(err);
				setSubmitting(false);
			}
		}
	};

	if (loading) {
		return <LoadingProfile />;
	}

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
							<Nav.Item>
								<Nav.Link
									eventKey="third"
									className={styles.navLink}
									active={width < 576 ? false : null}
									onClick={() => {
										if (width < 576) {
											setMobileActiveView(true);
										}
									}}
								>
									Email subscriptions
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					{(width > 577 || (mobileActiveView && width < 576)) && (
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey="first">
									{edit ? (
										<EditProfileStu
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
															style={{
																marginRight: "1rem",
															}}
															onClick={() => setMobileActiveView(false)}
														/>
													)}
													Your profile
												</Card.Header>
												<Card.Body>
													<Form onSubmit={onEdit}>
														<Form.Group controlId="formAvatar">
															<Form.Label>Avatar</Form.Label>
															<div className={styles.imageContainer}>
																<img
																	src={
																		userData && userData.avatar
																			? userData.avatar
																			: noImage
																	}
																	className={styles.image}
																	alt="student avatar"
																/>
															</div>
														</Form.Group>
														<Form.Group controlId="formName">
															<Form.Label>Name as in NRIC</Form.Label>{" "}
															<Form.Control
																placeholder={
																	userData !== null ? userData.name : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formDob">
															<Form.Label>Date of birth</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.dob : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formEmail">
															<Form.Label>Email address</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.id : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formContactNo">
															<Form.Label>Mobile number</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.contactNo : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formCourse">
															<Form.Label>Course of study</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.course : ""
																}
																readOnly
																onClick={onEdit}
															/>
														</Form.Group>
														<Form.Group controlId="formYear">
															<Form.Label>Year of study</Form.Label>
															<Form.Control
																placeholder={
																	userData !== null ? userData.year : ""
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
													{!startTimer && !userVerified && (
														<div
															style={{
																textDecoration: "underline",
																color: "#193f76",
																cursor: "pointer",
															}}
															onClick={() => {
																resendVerification();
																console.log("Email sent");
															}}
														>
															Click here to resend a verification email
														</div>
													)}
													{startTimer && (
														<div className="text-muted">
															Email sent. Please check your inbox for the
															verification email.
															<br />
															You can resend another verification email after{" "}
															{timer} seconds.
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
														style={{
															marginRight: "1rem",
														}}
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
												{errorPassword && (
													<>
														<Card.Text />
														<Alert variant="danger">{errorPassword}</Alert>
													</>
												)}
											</Card.Body>
										</Card>
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey="third">
									<>
										<Card bg="light" text="dark">
											<Card.Header
												as="h5"
												className="d-flex align-items-center"
											>
												{mobileActiveView && width < 576 && (
													<ArrowLeft
														style={{
															marginRight: "1rem",
														}}
														onClick={() => setMobileActiveView(false)}
													/>
												)}
												Email subscriptions
											</Card.Header>
											<Card.Body>
												<p>
													Want to get notified when new jobs are posted?
													Customize your preferences such that you are only
													notified by new job postings that contain the
													beneficiaries and skills that you are interested in.
													Don't forget to save your changes at the bottom!
												</p>
												<Formik
													initialValues={subscriptions}
													onSubmit={saveSubscriptions}
												>
													{({
														values,
														handleChange,
														handleBlur,
														handleSubmit,
														isSubmitting,
													}) => (
														<Form onSubmit={handleSubmit}>
															{setSubscriptions(values)}
															<div className={styles.subHeader}>
																Beneficiaries
															</div>
															<div className={styles.subBody}>
																{BeneficiaryTags.map((beneficiary) => {
																	return (
																		<Form.Group
																			controlId={`form${beneficiary}`}
																			className={styles.subGroup}
																		>
																			<Form.Check
																				key={beneficiary}
																				label={beneficiary}
																				name={beneficiary}
																				checked={values[beneficiary]}
																				onChange={handleChange}
																				onBlur={handleBlur}
																			/>
																		</Form.Group>
																	);
																})}
															</div>
															<div className={styles.subHeader}>Skills</div>
															<div className={styles.subBody}>
																{SkillTags.map((skill) => {
																	return (
																		<Form.Group
																			controlId={`form${skill}`}
																			className={styles.subGroup}
																		>
																			<Form.Check
																				key={skill}
																				label={skill}
																				name={skill}
																				checked={values[skill]}
																				onChange={handleChange}
																				onBlur={handleBlur}
																			/>
																		</Form.Group>
																	);
																})}
															</div>
															<Card.Text />
															<Button
																variant="primary"
																type="submit"
																disabled={isSubmitting}
															>
																Save changes
															</Button>
															<Card.Text />
															{successSubscriptions && (
																<Alert variant="success">
																	{successSubscriptions}
																</Alert>
															)}
															{errorSubscriptions && (
																<Alert variant="danger">
																	{errorSubscriptions}
																</Alert>
															)}
														</Form>
													)}
												</Formik>
											</Card.Body>
										</Card>
									</>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					)}
				</Row>
			</Tab.Container>
		</div>
	);
};

export default YourProfileStu;

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
