import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, Button, Form, Alert } from "react-bootstrap";
import styles from "./EditProfileStu.module.css";
import { Formik } from "formik";
import * as Yup from "yup";

const EditProfileStu = ({ setEdit }) => {
	const [leftButton, setLeftButton] = useState("Cancel");
	const [leftButtonVar, setLeftButtonVar] = useState("light");
	const { currentUser } = useAuth();
	const [userData, setUserData] = useState(null);
	// const [userLoading, setUserLoading] = useState(true);

	const [message, setMessage] = useState("");
	const [successful, setSuccessful] = useState(false);
	const [error, setError] = useState("");

	const getUser = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/student-accounts/" +
				currentUser.email
		);
		const jsonData = await response.json();
		setUserData(jsonData);
		// setUserLoading(false);
	};

	useEffect(() => {
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const mySubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		handleSubmit(values);

		async function handleSubmit(values) {
			//resetting submit states
			setSuccessful(false);
			setMessage("");
			setError("");

			const newAccountInfo = {
				name: values.name,
				dob: values.dob,
				contactNo: values.contactNo,
				course: values.course,
				year: values.year,
			};

			try {
				//signify start of update process

				await fetch(
					process.env.REACT_APP_BACKEND_URL +
						"/student-accounts/" +
						currentUser.email,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newAccountInfo),
					}
				);

				setSuccessful(true);
				setMessage("User profile updated successfully!");
				setLeftButton("Back");
				setLeftButtonVar("primary");
				resetForm();
				setSubmitting(false);
			} catch (err) {
				setError("Failed to update user info");
				console.log(err);
			}
		}
	};

	return (
		<>
			<div className={styles.formBG}>
				<div className={styles.formContainer}>
					<Card bg="light" text="dark" style={{ width: "23rem" }}>
						<Card.Header as="h6">Edit your profile</Card.Header>
						<Card.Body>
							<Formik
								enableReinitialize={true}
								initialValues={{
									name: userData !== null ? userData.name : "",
									dob: userData !== null ? userData.dob : "",
									contactNo: userData !== null ? userData.contactNo : "",
									course: userData !== null ? userData.course : "",
									year: userData !== null ? userData.year : "",
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
										<Form.Group controlId="formName">
											<Form.Label>Name as in NRIC</Form.Label>{" "}
											<Form.Control
												name="name"
												onChange={handleChange}
												onBlur={handleBlur}
												values={values.name}
												isValid={touched.name && !errors.name}
												isInvalid={touched.name && errors.name}
												placeholder={values.name}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.name}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formDob">
											<Form.Label>Date of birth</Form.Label>
											<Form.Control
												name="dob"
												onChange={handleChange}
												onBlur={handleBlur}
												values={values.dob}
												isValid={touched.dob && !errors.dob}
												isInvalid={touched.dob && errors.dob}
												type="date"
												placeholder={values.dob}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.dob}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formEmail">
											<Form.Label>Email address</Form.Label>
											<Form.Control
												placeholder={userData !== null ? userData.id : ""}
												disabled
											/>
										</Form.Group>
										<Form.Group controlId="formContactNo">
											<Form.Label>Mobile number</Form.Label>
											<Form.Control
												name="contactNo"
												onChange={handleChange}
												onBlur={handleBlur}
												values={values.contactNo}
												isValid={touched.contactNo && !errors.contactNo}
												isInvalid={touched.contactNo && errors.contactNo}
												placeholder={values.contactNo}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.contactNo}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formCourse">
											<Form.Label>Course of study</Form.Label>
											<Form.Control
												name="course"
												onChange={handleChange}
												onBlur={handleBlur}
												values={values.course}
												isValid={touched.course && !errors.course}
												isInvalid={touched.course && errors.course}
												placeholder={values.course}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.course}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formYear">
											<Form.Label>Year of study</Form.Label>
											<Form.Control
												name="year"
												onChange={handleChange}
												onBlur={handleBlur}
												values={values.year}
												isValid={touched.year && !errors.year}
												isInvalid={touched.year && errors.year}
												as="select"
												placeholder={values.year}
											>
												<option disabled selected value=""></option>
												<option>Year 1</option>
												<option>Year 2</option>
												<option>Year 3</option>
												<option>Year 4</option>
												<option>Year 5</option>
												<option>Alumni</option>
											</Form.Control>
											<Form.Control.Feedback type="invalid">
												{errors.year}
											</Form.Control.Feedback>
										</Form.Group>
										<div className={styles.buttonContainer}>
											<div>
												<Button
													variant={leftButtonVar}
													onClick={(event) => setEdit(false)}
												>
													{leftButton}
												</Button>
											</div>
											<div className={styles.rightButton}>
												<Button
													disabled={isSubmitting || successful}
													variant="primary"
													type="submit"
												>
													Submit
												</Button>
											</div>
										</div>

										<Card.Text />

										{error ? (
											<Alert variant="danger">{error}</Alert>
										) : isSubmitting ? (
											<Alert variant="primary">Updating your profile...</Alert>
										) : successful ? (
											<Alert variant="success">{message}</Alert>
										) : (
											<Alert variant="warning">
												You can leave the fields you do not want to edit as
												blank
											</Alert>
										)}
									</Form>
								)}
							</Formik>
						</Card.Body>
					</Card>
				</div>
			</div>
		</>
	);
};

export default EditProfileStu;

const validationSchema = Yup.object().shape({
	name: Yup.string("Please enter your full name as indicated on your NRIC")
		.required("Please enter your full name as indicated on your NRIC")
		.nullable(),
	dob: Yup.date("Please enter your date of birth")
		.required("Please enter your date of birth")
		.nullable(),
	contactNo: Yup.string("Please enter your mobile number")
		.matches(/^[0-9]+$/, "Please enter a 8 digit number")
		.min(8, "Please enter a 8 digit number")
		.max(8, "Please enter a 8 digit number")
		.required("Please enter your mobile number")
		.nullable(),
	course: Yup.string("Please enter your course of study in NUS")
		.required("Please enter your course of study in NUS")
		.nullable(),
	year: Yup.string("Please indicate your year of study or if you are an alumni")
		.required("Please indicate your year of study or if you are an alumni")
		.nullable(),
});
