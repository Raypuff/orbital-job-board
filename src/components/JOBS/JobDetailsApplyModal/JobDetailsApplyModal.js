//IMPORTS
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
import { Modal, Button, Form, Alert } from "react-bootstrap";
//React Router
import { Link } from "react-router-dom";
//Auth contexts
import { useAuth } from "../../../contexts/AuthContext";
//Form validation
import { Formik } from "formik";
import * as Yup from "yup";
//CSS Modules
import styles from "./JobDetailsApplyModal.module.css";
//Unique ID
var uniqid = require("uniqid");

export const JobDetailsApplyModal = ({
	show,
	onHide,
	id,
	orgType,
	orgName,
	orgEmail,
	status,
	title,
	beneficiaries,
	skills,
	purpose,
	platform,
	multiLocation,
	location,
	postalCode,
	type,
	flexiDate,
	longStartDate,
	longEndDate,
	flexiHours,
	longHours,
	adShift,
	addInfo,
	imageUrl,
	pocName,
	pocNo,
	pocEmail,
	applicants,
}) => {
	//USESTATES
	//Student details
	const [student, setStudent] = useState(null);
	//If successful application
	const [successful, setSuccessful] = useState(false);
	//Error message
	const [error, setError] = useState("");
	//Success message
	const [message, setMessage] = useState("");
	//Whether the student has filled in their details on their profile
	const [canRetrieve, setCanRetrieve] = useState(false);

	//CUSTOM HOOKS
	const { currentUser, userType, userVerified } = useAuth();

	//USEEFFECTS
	//Retrieving student details
	useEffect(() => {
		const getStu = async () => {
			try {
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL +
						"/student-accounts/" +
						currentUser.email
				);
				const jsonData = await response.json();
				setStudent(jsonData);
				const { name, dob, email, contactNo, course, year } = jsonData;
				if (name && dob && email && contactNo && course && year) {
					setCanRetrieve(true);
				}
			} catch (err) {
				console.error(err);
			}
		};
		getStu();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//FUNCTION TO SUBMIT APPLICATION
	const mySubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		handleSubmit(values);

		async function handleSubmit(values) {
			setMessage("");
			setError("");
			//Creating unique app id
			const appID = uniqid();

			//Created instance for new app
			const newApp = {
				id: appID,
				stuID: currentUser.email,
				jobID: id,
				status: "Pending",
				stuName: values.retrieveDetails ? student.name : values.stuName,
				stuDob: values.retrieveDetails ? student.dob : values.stuDob,
				stuEmail: values.retrieveDetails ? student.email : values.stuEmail,
				stuNo: values.retrieveDetails ? student.contactNo : values.stuNo,
				stuCourse: values.retrieveDetails ? student.course : values.stuCourse,
				stuYear: values.retrieveDetails ? student.year : values.stuYear,
				stuAddInfo: values.stuAddInfo,
			};

			//Creating object to update applicants in jobs
			const updateApplicants = {
				student_id: currentUser.email,
			};

			//Creating object to update jobs_applied in student-accounts;
			const updateApplied = {
				jobID: id,
			};
			try {
				console.log(newApp);
				await fetch(process.env.REACT_APP_BACKEND_URL + "/job-applications", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newApp),
				});

				await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs/apply/" + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updateApplicants),
				});

				await fetch(
					process.env.REACT_APP_BACKEND_URL +
						"/student-accounts/apply-job/" +
						currentUser.email,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(updateApplied),
					}
				);
				//Sending email
				const text = `Hello ${orgName}! There is a new application for your job ${title}. Please click on the link below and log in to view the new job application! volunteer-ccsgp-vercel.app`;
				const html = `Hello ${orgName}!<br>There is a new application for your job ${title}. <br>Please click on the link below and log in to view the new job application! <a href="volunteer-ccsgp-vercel.app">volunteer-ccsgp-vercel.app</a>`;
				const msg = {
					msg: {
						to: orgEmail,
						from: "volunteerccsgp@gmail.com",
						subject: `[Volunteer CCSGP] New applicant for your job ${title}`,
						text: text,
						html: html,
					},
				};
				await fetch(process.env.REACT_APP_BACKEND_URL + "/email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(msg),
				});
				//Sending notification
				const newNotif = {
					newNotif: {
						id: uniqid(),
						receiverID: orgEmail,
						header: "New applicant for your job",
						message: `Your job (${title}) has a new applicant`,
						dateTime: new Date().toUTCString(),
						dismissed: false,
					},
				};

				await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newNotif),
				});

				setMessage("Application successful");
				setSuccessful(true);
				resetForm();
				setSubmitting(false);
			} catch (err) {
				setError(err);
			}
		}
	};

	if (currentUser !== null && userType === "student" && userVerified) {
		return (
			<Modal show={show} onHide={onHide} size="lg" centered>
				<Formik
					initialValues={{
						retrieveDetails: false,
						stuName: "",
						stuDob: "",
						stuEmail: "",
						stuNo: "",
						stuCourse: "",
						stuYear: "",
						stuAddInfo: "",
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
							<Modal.Header closeButton>
								<Modal.Title id="contained-modal-title-vcenter">
									You are applying for
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h3>{`${title} by ${orgName}`}</h3>
								<hr className={styles.divider} />
								<h4>Personal details</h4>
								<h6>
									Please help us to fill in your personal details to volunteer!
								</h6>
								<Form.Group>
									<Form.Check
										name="retrieveDetails"
										label="Retrieve details from your profile"
										checked={values.retrieveDetails}
										onChange={handleChange}
										onBlur={handleBlur}
										feedback={errors.retrieveDetails}
										disabled={!canRetrieve}
									/>
									{!canRetrieve && (
										<Form.Text>
											<Alert variant="warning">
												You need to fill in your details on{" "}
												<Link to="/profile-student" target="_blank">
													your profile
												</Link>{" "}
												before we can help you autofill the form
											</Alert>
										</Form.Text>
									)}
								</Form.Group>

								<Form.Group>
									<Form.Label>Full name as in NRIC</Form.Label>
									<Form.Control
										name="stuName"
										value={values.stuName}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuName && !errors.stuName}
										isInvalid={touched.stuName && errors.stuName}
										disabled={values.retrieveDetails}
										placeholder={values.retrieveDetails ? student.name : ""}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.stuName}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Date of birth</Form.Label>
									<Form.Control
										name="stuDob"
										value={values.stuDob}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuDob && !errors.stuDob}
										isInvalid={touched.stuDob && errors.stuDob}
										type="date"
										disabled={values.retrieveDetails}
										placeholder={values.retrieveDetails ? student.dob : ""}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.stuDob}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										name="stuEmail"
										value={values.stuEmail}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuEmail && !errors.stuEmail}
										isInvalid={touched.stuEmail && errors.stuEmail}
										type="email"
										disabled={values.retrieveDetails}
										placeholder={values.retrieveDetails ? student.email : ""}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.stuEmail}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Mobile number</Form.Label>
									<Form.Control
										name="stuNo"
										value={values.stuNo}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuNo && !errors.stuNo}
										isInvalid={touched.stuNo && errors.stuNo}
										disabled={values.retrieveDetails}
										placeholder={
											values.retrieveDetails ? student.contactNo : ""
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.stuNo}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Course of study</Form.Label>
									<Form.Control
										name="stuCourse"
										value={values.stuCourse}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuCourse && !errors.stuCourse}
										isInvalid={touched.stuCourse && errors.stuCourse}
										disabled={values.retrieveDetails}
										placeholder={values.retrieveDetails ? student.course : ""}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.stuCourse}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Year of study</Form.Label>
									<Form.Control
										name="stuYear"
										values={values.stuYear}
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuYear && !errors.stuYear}
										isInvalid={touched.stuYear && errors.stuYear}
										as="select"
										disabled={values.retrieveDetails}
										placeholder={values.retrieveDetails ? student.year : ""}
									>
										<option value="" disabled selected>
											Select your year
										</option>
										<option>Year 1</option>
										<option>Year 2</option>
										<option>Year 3</option>
										<option>Year 4</option>
										<option>Year 5</option>
										<option>Alumni</option>
									</Form.Control>
									<Form.Control.Feedback type="invalid">
										{errors.stuYear}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group>
									<Form.Label>Additional information</Form.Label>
									<Form.Control
										name="stuAddInfo"
										onChange={handleChange}
										onBlur={handleBlur}
										isValid={touched.stuAddInfo && !errors.stuAddInfo}
										isInvalid={touched.stuAddInfo && errors.stuAddInfo}
										as="textarea"
										rows={2}
									/>
								</Form.Group>
								{error && <Alert variant="danger">{error}</Alert>}
								{isSubmitting && (
									<Alert variant="primary">
										Submitting your application...
									</Alert>
								)}
								{message && (
									<Alert variant="success">
										<Alert.Heading as="h6">{message}</Alert.Heading>
										<hr />
										<p className="mb-0">
											You will receive an email when your application has been
											reviewed by {orgName}. Thank you!
										</p>
									</Alert>
								)}
							</Modal.Body>
							<Modal.Footer>
								<Button
									type="submit"
									style={{ margin: "0 auto 0 " }}
									disabled={successful || isSubmitting}
								>
									Apply now
								</Button>
							</Modal.Footer>
						</Form>
					)}
				</Formik>
			</Modal>
		);
	} else if (currentUser !== null && userType === "student" && !userVerified) {
		return <UnverifiedModal show={show} onHide={onHide} />;
	} else {
		return <SignedOutModal show={show} onHide={onHide} />;
	}
};

// Apply button to open this modal
export const ApplyButton = ({ handleClick }) => {
	return (
		<div className={styles.button} onClick={handleClick}>
			Apply now
		</div>
	);
};

//Disabled button so that students can't apply
export const DisabledButton = () => {
	return <div className={styles.disabledButton}>Already applied</div>;
};

//Modal to show if the student is unverified
const UnverifiedModal = ({ show, onHide }) => {
	return (
		<Modal show={show} onHide={onHide} size="md" centered>
			<Modal.Header closeButton>
				<Modal.Title>Please verify your account</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5 className="text-center mb-4">
					To apply for volunteer jobs, please verify your account by clicking
					the link in your email first. Thank you!
				</h5>
				<p className="text-center">
					Didn't receive a verification email? Proceed to{" "}
					<Link to="/profile-student">your profile details </Link>
					to resend a verification email!
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

//Modal to show if the user is signed out
const SignedOutModal = ({ show, onHide }) => {
	return (
		<Modal show={show} onHide={onHide} size="md" centered>
			<Modal.Header closeButton>
				<Modal.Title>Please sign in</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h5>
					To apply for volunteer jobs, please{" "}
					<Link to="/sign-in-student">sign in as NUS student</Link> first{" "}
				</h5>
				<p>
					Don't have an account? <Link to="/sign-up-student">Sign up here</Link>
					!
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

//Validation schema for application form
const validationSchema = Yup.object().shape({
	retrieveDetails: Yup.bool(),
	stuName: Yup.string().when(["retrieveDetails"], {
		is: false,
		then: Yup.string().required(
			"Please enter your full name as indicated on your NRIC"
		),
	}),
	stuDob: Yup.date().when(["retrieveDetails"], {
		is: false,
		then: Yup.date().required("Please enter you date of birth"),
	}),
	stuEmail: Yup.string().when(["retrieveDetails"], {
		is: false,
		then: Yup.string()
			.email("Please enter a valid email address")
			.required("Please enter your email address"),
	}),
	stuNo: Yup.string().when(["retrieveDetails"], {
		is: false,
		then: Yup.string()
			.matches(/^[0-9]+$/, "Please enter a 8 digit number")
			.min(8, "Please enter a 8 digit number")
			.max(8, "Please enter a 8 digit number")
			.required("Please enter your mobile number"),
	}),
	stuCourse: Yup.string().when(["retrieveDetails"], {
		is: false,
		then: Yup.string().required("Please enter your course of study in NUS"),
	}),
	stuYear: Yup.string().when(["retrieveDetails"], {
		is: false,
		then: Yup.string().required(
			"Please indicate your year of study or if you are an alumni"
		),
	}),
	stuAddInfo: Yup.string(),
});
