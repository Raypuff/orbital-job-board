import { useState, useEffect } from "react";
import {
	Row,
	Col,
	Accordion,
	Card,
	Form,
	Button,
	Alert,
} from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Shifts from "./Shifts";
import Terms from "./Terms";
import styles from "./PostAJob.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { BeneficiaryTags, SkillTags } from "../../../assets/Tags";

var uniqid = require("uniqid");

const PostAJob = () => {
	// Database useStates
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	// Form useStates
	const [beneficiaries, setBeneficiaries] = useState([]);
	const [skills, setSkills] = useState([]);

	//finding currentUser that is logged in
	const { currentUser } = useAuth();

	//to obtain currentUser data from database
	const [userData, setUserData] = useState(null);

	//retrieve user from database
	const getUser = async () => {
		const response = await fetch(
			"https://volunteer-ccsgp-backend.herokuapp.com/organization_accounts/" +
				currentUser.email,
			{}
		);
		const jsonData = await response.json();
		setUserData(jsonData);
	};

	useEffect(() => {
		getUser();
	}, []);

	const mySubmit = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		handleSubmit(values);

		async function handleSubmit(values) {
			//resetting useStates
			setMessage("");
			setError("");

			const jobID = uniqid();
			const newJob = {
				id: jobID,
				orgID: currentUser.email,
				status: "Pending",
				title: values.title,
				beneficiaries: beneficiaries,
				skills: skills,
				purpose: values.purpose,
				platform: values.platform,
				multiLocation: values.multiLocation,
				location: values.location,
				postalCode: values.postalCode,
				type: values.type,
				flexiDate: values.flexiDate,
				longStartDate: values.longStartDate,
				longEndDate: values.longEndDate,
				flexiHours: values.flexiHours,
				longHours: values.longHours,
				adShift: adShiftProcessor(
					values.shiftNumber,
					values.shift1Date,
					values.shift1Start,
					values.shift1End,
					values.shift2Date,
					values.shift2Start,
					values.shift2End,
					values.shift3Date,
					values.shift3Start,
					values.shift3End,
					values.shift4Date,
					values.shift4Start,
					values.shift4End,
					values.shift5Date,
					values.shift5Start,
					values.shift5End,
					values.shift6Date,
					values.shift6Start,
					values.shift6End,
					values.shift7Date,
					values.shift7Start,
					values.shift7End,
					values.shift8Date,
					values.shift8Start,
					values.shift8End,
					values.shift9Date,
					values.shift9Start,
					values.shift9End,
					values.shift10Date,
					values.shift10Start,
					values.shift10End
				),
				addInfo: values.addInfo,
				imageUrl: values.imageUrl,
				pocName: values.retrievePoc ? userData.pocName : values.pocName,
				pocNo: values.retrievePoc ? userData.pocNo : values.pocNo,
				pocEmail: values.retrievePoc ? userData.pocEmail : values.pocEmail,
			};

			try {
				//postjob to jobs database
				const body = { newJob };
				await fetch("https://volunteer-ccsgp-backend.herokuapp.com/jobs", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				});

				const body2 = {
					newJobID: jobID,
				};

				await fetch(
					"https://volunteer-ccsgp-backend.herokuapp.com/organization_accounts/postjob/" +
						currentUser.email,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body2),
					}
				);
				setMessage("Job posting successful");
				resetForm();
				setSubmitting(false);
			} catch (err) {
				setError("Failed to post due to internal error");
			}
		}
	};

	return (
		<div className={styles.formContainer}>
			<Formik
				initialValues={{
					title: "",
					purpose: "",
					platform: "Physical",
					multiLocation: false,
					location: "",
					postalCode: 0,
					type: "Long term",
					flexiDate: false,
					longStartDate: "",
					longEndDate: "",
					flexiHours: false,
					longHours: 0,
					shiftNumber: 0,
					shift1Date: "",
					shift1Start: "",
					shift1End: "",
					shift2Date: "",
					shift2Start: "",
					shift2End: "",
					shift3Date: "",
					shift3Start: "",
					shift3End: "",
					shift4Date: "",
					shift4Start: "",
					shift4End: "",
					shift5Date: "",
					shift5Start: "",
					shift5End: "",
					shift6Date: "",
					shift6Start: "",
					shift6End: "",
					shift7Date: "",
					shift7Start: "",
					shift7End: "",
					shift8Date: "",
					shift8Start: "",
					shift8End: "",
					shift9Date: "",
					shift9Start: "",
					shift9End: "",
					shift10Date: "",
					shift10Start: "",
					shift10End: "",
					addInfo: "",
					imageUrl: "",
					pocName: "",
					pocNo: "",
					pocEmail: "",
					retrievePoc: false,
					terms: false,
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
					<Form onSubmit={handleSubmit} className={styles.formBox}>
						{console.log(values)}
						<Accordion defaultActiveKey="0">
							<Card>
								{/* Accordion 1: Organization Details (These details are not collected in this form) */}
								<Accordion.Toggle as={Card.Header} eventKey="0">
									<h5>Organization Details</h5>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">
									<div className={styles.accordionBox}>
										<Form.Group controlId="formOrgType">
											<Form.Label>Organization Type</Form.Label>
											<Form.Control
												required
												placeholder={userData !== null ? userData.type : ""}
												readOnly
											></Form.Control>
										</Form.Group>
										<Form.Group controlId="formOrgName">
											<Form.Label>Name of Organization</Form.Label>
											<Form.Control
												required
												placeholder={userData !== null ? userData.name : ""}
												readOnly
											></Form.Control>
										</Form.Group>
										<Form.Group controlId="formOrgUen">
											<Form.Label>
												UEN, Charity registration number or Society registration
												number
											</Form.Label>
											<Form.Control
												required
												placeholder={userData !== null ? userData.uen : ""}
												readOnly
											></Form.Control>
										</Form.Group>
										<Form.Group controlId="formOrgEmail">
											<Form.Label>Email address of Organization</Form.Label>
											<Form.Control
												required
												placeholder={userData !== null ? userData.id : ""}
												readOnly
											></Form.Control>
										</Form.Group>
									</div>
								</Accordion.Collapse>
								{/* Accordion 2: Job Details */}
								<Accordion.Toggle as={Card.Header} eventKey="1">
									<h5>Job Details</h5>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="1">
									<div className={styles.accordionBox}>
										{/* About the job */}
										<Form.Group controlId="formTitle">
											<Form.Label>Title of volunteer work</Form.Label>
											<Form.Control
												type="text"
												name="title"
												placeholder="Python instructor"
												value={values.title}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.title && !errors.title}
												isInvalid={touched.title && errors.title}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.title}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group controlId="formBeneficiary">
											<Form.Label>Target profile of beneficiary</Form.Label>
											<DropdownMultiselect
												placeholder="Select at least one beneficiary"
												options={BeneficiaryTags}
												name="beneficiaries"
												handleOnChange={(selected) => {
													setBeneficiaries(selected);
												}}
											/>
										</Form.Group>
										<Form.Group controlId="formSkills">
											<Form.Label>Skills required</Form.Label>
											<DropdownMultiselect
												placeholder="Select at least one skill"
												options={SkillTags}
												name="skills"
												handleOnChange={(selected) => {
													setSkills(selected);
												}}
											/>
										</Form.Group>
										<Form.Group controlId="formPurpose">
											<Form.Label>Purpose of volunteer work</Form.Label>
											<Form.Control
												type="text"
												as="textarea"
												rows={2}
												name="purpose"
												placeholder={`Teach children basic programming skills
(Elaborate on how students can benefit from volunteering)`}
												value={values.purpose}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.purpose && !errors.purpose}
												isInvalid={touched.purpose && errors.purpose}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.purpose}
											</Form.Control.Feedback>
										</Form.Group>
										{/* Platform and Location */}
										<Form.Group controlId="formPlatform">
											<Form.Label>Platform of volunteer work</Form.Label>
											<Form.Control
												name="platform"
												as="select"
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.platform && !errors.platform}
												isInvalid={touched.platform && errors.platform}
											>
												<option>Physical</option>
												<option>Virtual</option>
											</Form.Control>
											<Form.Control.Feedback type="invalid">
												{errors.platform}
											</Form.Control.Feedback>
										</Form.Group>
										<div
											className={
												values.platform === "Virtual"
													? styles.typeDisplayNone
													: styles.typeDisplay
											}
										>
											<Row>
												<Col md={8}>
													<Form.Group controlId="formLocation">
														<Form.Label>Location of volunteer work</Form.Label>

														<Form.Control
															type="text"
															readOnly={
																values.multiLocation ||
																values.platform === "Virtual"
															}
															name="location"
															value={values.location}
															onChange={handleChange}
															onBlur={handleBlur}
															placeholder={
																values.multiLocation ||
																values.platform === "Virtual"
																	? null
																	: "Bukit Timah Plaza"
															}
															isValid={touched.location && !errors.location}
															isInvalid={touched.location && errors.location}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.location}
														</Form.Control.Feedback>
														<Form.Text>
															<Form.Group controlId="formMultiLocation">
																<Form.Check
																	name="multiLocation"
																	label="Multiple locations"
																	disabled={values.platform === "Virtual"}
																	checked={
																		values.platform === "Virtual"
																			? false
																			: values.multiLocation
																	}
																	onChange={handleChange}
																	onBlur={handleBlur}
																	feedback={errors.multiLocation}
																/>
															</Form.Group>
														</Form.Text>
													</Form.Group>
												</Col>
												<Col md={4}>
													<Form.Group controlId="formPostalCode">
														<Form.Label>Postal code of location</Form.Label>
														<Form.Control
															type="text"
															name="postalCode"
															value={values.postalCode}
															onChange={handleChange}
															onBlur={handleBlur}
															readOnly={
																values.multiLocation ||
																values.platform === "Virtual"
															}
															placeholder={
																values.multiLocation ||
																values.platform === "Virtual"
																	? null
																	: 588996
															}
															isValid={touched.postalCode && !errors.postalCode}
															isInvalid={
																touched.postalCode && errors.postalCode
															}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.postalCode}
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
											</Row>
										</div>
										{/* Date and Time */}
										<Form.Group controlId="formType">
											<Form.Label>
												Type of volunteer commitment level
											</Form.Label>
											<Form.Control
												name="type"
												as="select"
												onChange={handleChange}
												onBlur={handleBlur}
												values={values.type}
												isValid={touched.type && !errors.type}
												isInvalid={touched.type && errors.type}
											>
												<option>Long term</option>
												<option>Ad hoc</option>
											</Form.Control>
											<Form.Control.Feedback type="invalid">
												{errors.type}
											</Form.Control.Feedback>
										</Form.Group>
										{/* Long term */}
										<div
											className={
												values.type !== "Long term"
													? styles.typeDisplayNone
													: styles.typeDisplay
											}
										>
											<Row>
												<Col>
													<Form.Group controlId="formLongStartDate">
														<Form.Label>
															Long term - Start date of volunteer work
														</Form.Label>
														<Form.Control
															name="longStartDate"
															readOnly={
																values.type !== "Long term" || values.flexiDate
															}
															type="date"
															value={values.longStartDate}
															onChange={handleChange}
															onBlur={handleBlur}
															isValid={
																touched.longStartDate && !errors.longStartDate
															}
															isInvalid={
																touched.longStartDate && errors.longStartDate
															}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.longStartDate}
														</Form.Control.Feedback>
														<Form.Text>
															<Form>
																<Form.Group>
																	<Form.Check
																		name="flexiDate"
																		label="Start and end dates are flexible"
																		checked={
																			values.type !== "Long term"
																				? false
																				: values.flexiDate
																		}
																		onChange={handleChange}
																		onBlur={handleBlur}
																		feedback={errors.flexiDate}
																	/>
																</Form.Group>
															</Form>
														</Form.Text>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group controlId="formLongEndDate">
														<Form.Label>
															Long term - End date of volunteer work
														</Form.Label>
														<Form.Control
															name="longEndDate"
															type="date"
															readOnly={
																values.type !== "Long term" || values.flexiDate
															}
															value={values.longEndDate}
															onChange={handleChange}
															onBlur={handleBlur}
															isValid={
																touched.longEndDate && !errors.longEndDate
															}
															isInvalid={
																touched.longEndDate && errors.longEndDate
															}
														/>
														<Form.Control.Feedback type="invalid">
															{errors.longEndDate}
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
											</Row>
											<Form.Group controlId="formLongHours">
												<Form.Label>
													Long term - Number of hours to commit
												</Form.Label>
												<Form.Control
													name="longHours"
													readOnly={
														values.type !== "Long term" || values.flexiHours
													}
													placeholder={
														values.type !== "Long term" || values.flexiHours
															? null
															: 40
													}
													value={values.longHours}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.longHours && !errors.longHours}
													isInvalid={touched.longHours && errors.longHours}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.longHours}
												</Form.Control.Feedback>
												<Form.Text>
													<Form>
														<Form.Group>
															<Form.Check
																name="flexiHours"
																label="Number of hours to commit is flexible"
																checked={
																	values.type !== "Long term"
																		? false
																		: values.flexiHours
																}
																onChange={handleChange}
																onBlur={handleBlur}
																feedback={errors.flexiHours}
															/>
														</Form.Group>
													</Form>
												</Form.Text>
											</Form.Group>
										</div>
										{/* Ad hoc */}
										<div
											className={
												values.type === "Ad hoc"
													? styles.typeDisplay
													: styles.typeDisplayNone
											}
										>
											<Form.Group controlId="formShiftNumber">
												<Form.Label>Ad hoc - Number of shifts</Form.Label>
												<Form.Control
													name="shiftNumber"
													disabled={values.type !== "Ad hoc"}
													placeholder={
														values.type !== "Ad hoc" ? null : values.shiftNumber
													}
													type="number"
													min="0"
													max="10"
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.shiftNumber && !errors.shiftNumber}
													isInvalid={touched.shiftNumber && errors.shiftNumber}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.shiftNumber}
												</Form.Control.Feedback>
											</Form.Group>
										</div>

										<Shifts
											handleChange={handleChange}
											handleBlur={handleBlur}
											values={values}
											touched={touched}
											errors={errors}
										/>

										{/* Remaining details */}
										<Form.Group controlId="formAddInfo">
											<Form.Label>Additional information</Form.Label>
											<Form.Control
												name="addInfo"
												type="text"
												as="textarea"
												rows={2}
												value={values.addInfo}
												placeholder="Minimum commitment is 2 months"
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.addInfo && !errors.addInfo}
												isInvalid={touched.addInfo && errors.addInfo}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.addInfo}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formImageUrl">
											<Form.Label>Image URL</Form.Label>
											<Form.Control
												name="imageUrl"
												type="text"
												placeholder="Direct Imgur link to image"
												value={values.imageUrl}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.imageUrl && !errors.imageUrl}
												isInvalid={touched.imageUrl && errors.imageUrl}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.imageUrl}
											</Form.Control.Feedback>
										</Form.Group>
									</div>
								</Accordion.Collapse>
								<Accordion.Toggle as={Card.Header} eventKey="2">
									<h5>Contact Details</h5>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="2">
									<div className={styles.accordionBox}>
										<Form.Group controlId="formPocName">
											<Form.Label>Name of contact person</Form.Label>
											<Form.Control
												name="pocName"
												type="text"
												readOnly={values.retrievePoc}
												placeholder={userData !== null ? userData.pocName : ""}
												value={
													values.retrievePoc ? userData.pocName : values.pocName
												}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.pocName && !errors.pocName}
												isInvalid={touched.pocName && errors.pocName}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.pocName}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formPocNo">
											<Form.Label>Mobile number of contact person</Form.Label>
											<Form.Control
												name="pocNo"
												type="text"
												readOnly={values.retrievePoc}
												placeholder={userData !== null ? userData.pocNo : ""}
												value={
													values.retrievePoc ? userData.pocNo : values.pocNo
												}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.pocNo && !errors.pocNo}
												isInvalid={touched.pocNo && errors.pocNo}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.pocNo}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formPocEmail">
											<Form.Label>Email address of contact person</Form.Label>
											<Form.Control
												name="pocEmail"
												type="email"
												readOnly={values.retrievePoc}
												placeholder={userData !== null ? userData.pocEmail : ""}
												value={
													values.retrievePoc
														? userData.pocEmail
														: values.pocEmail
												}
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.pocEmail && !errors.pocEmail}
												isInvalid={touched.pocEmail && errors.pocEmail}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.pocEmail}
											</Form.Control.Feedback>
										</Form.Group>
										<Form.Group controlId="formRetrievePoc">
											<Form.Check
												name="retrievePoc"
												label="Retrieve contact details from 'Your Profile'"
												checked={values.retrievePoc}
												onChange={handleChange}
												onBlur={handleBlur}
												feedback={errors.retrievePoc}
											/>
										</Form.Group>
									</div>
								</Accordion.Collapse>
								<Accordion.Toggle as={Card.Header} eventKey="3">
									<h5>Terms and Conditions of Use</h5>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="3">
									<div className={styles.accordionBox}>
										<Terms />
										<Form.Group controlId="formTerms">
											<Form.Check
												name="terms"
												label="I agree with the Terms and Conditions of Use"
												onChange={handleChange}
												onBlur={handleBlur}
												isValid={touched.terms && !errors.terms}
												isInvalid={touched.terms && errors.terms}
												feedback={errors.terms}
											/>
										</Form.Group>
									</div>
								</Accordion.Collapse>
							</Card>
						</Accordion>

						<Card.Text />
						<Button disabled={isSubmitting} variant="primary" type="submit">
							Post job
						</Button>
						<Card.Text />
						{error && <Alert variant="danger">{error}</Alert>}
						{isSubmitting && (
							<Alert variant="primary">Posting your job...</Alert>
						)}
						{message && (
							<Alert variant="success">
								<Alert.Header as="h6">{message}</Alert.Header>
								<hr />
								<p className="mb-0"></p>Your job will be publicly available once
								it has been approved by an administrator
							</Alert>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default PostAJob;

function adShiftProcessor(
	shiftNumber,
	shift1Date,
	shift1Start,
	shift1End,
	shift2Date,
	shift2Start,
	shift2End,
	shift3Date,
	shift3Start,
	shift3End,
	shift4Date,
	shift4Start,
	shift4End,
	shift5Date,
	shift5Start,
	shift5End,
	shift6Date,
	shift6Start,
	shift6End,
	shift7Date,
	shift7Start,
	shift7End,
	shift8Date,
	shift8Start,
	shift8End,
	shift9Date,
	shift9Start,
	shift9End,
	shift10Date,
	shift10Start,
	shift10End
) {
	const temp = [
		[shift1Date, shift1Start, shift1End],
		[shift2Date, shift2Start, shift2End],
		[shift3Date, shift3Start, shift3End],
		[shift4Date, shift4Start, shift4End],
		[shift5Date, shift5Start, shift5End],
		[shift6Date, shift6Start, shift6End],
		[shift7Date, shift7Start, shift7End],
		[shift8Date, shift8Start, shift8End],
		[shift9Date, shift9Start, shift9End],
		[shift10Date, shift10Start, shift10End],
	];

	const returnList = [];
	for (var i = 0; i < shiftNumber; i++) {
		var holder = { date: "", startTime: "", endTime: "" };
		holder.date = temp[i][0];
		holder.startTime = temp[i][1];
		holder.endTime = temp[i][2];
		returnList.push(holder);
	}
	return returnList;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required("Please indicate the volunteer job title"),
	purpose: Yup.string().required(
		"Please indicate the Purpose of the volunteer job"
	),
	platform: Yup.string().required(
		"Please indicate if the Platform is Physical or Virtual"
	),
	multiLocation: Yup.bool(),
	location: Yup.string().when("platform", {
		is: "Physical",
		then: Yup.string().required(
			"Please indicate the location of the volunteer job"
		),
	}),
	postalCode: Yup.string().when("platform", {
		is: "Physical",
		then: Yup.string("Please enter a 6 digit number")
			.matches(/^[0-9]+$/, "Please enter a 6 digit number")
			.min(6, "Please enter a 6 digit number")
			.max(6, "Please enter a 6 digit number")
			.required("Please indicate the Postal Code of the volunteer job"),
	}),
	type: Yup.string().required(
		"Please indicate if the Type is Long term or Ad hoc"
	),
	flexiDate: Yup.bool(),
	longStartDate: Yup.date().when(["type", "flexiDate"], {
		is: (type, flexiDate) => type === "Long term" && flexiDate !== true,
		then: Yup.date().required(
			"Please indicate the Start Date of the Volunteer job (If the date is flexible, tick 'Start and end dates are flexible'"
		),
	}),
	longEndDate: Yup.date().when(["type", "flexiDate"], {
		is: (type, flexiDate) => type === "Long term" && flexiDate !== true,
		then: Yup.date().required(
			"Please indicate the End Date of the Volunteer job (If the date is flexible, tick 'Start and end dates are flexible'"
		),
	}),
	flexiHours: Yup.bool(),
	longHours: Yup.number().when(["type", "flexiHours"], {
		is: (type, flexiHours) => type === "Long term" && flexiHours !== true,
		then: Yup.number("Please enter a number")
			.positive("Please only enter a positive number")
			.required("Please indicate the number of hours to commit"),
	}),
	shiftNumber: Yup.number("Please only enter numbers"),
	shift1Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 1,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift1Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 1,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift1End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 1,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift2Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 2,
		then: Yup.date().required("Please the indicate date of the shift"),
	}),
	shift2Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 2,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift2End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 2,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift3Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 3,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift3Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 3,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift3End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 3,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift4Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 4,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift4Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 4,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift4End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 4,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift5Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 5,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift5Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 5,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift5End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 5,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift6Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 6,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift6Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 6,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift6End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 6,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift7Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 7,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift7Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 7,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift7End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 7,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift8Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 8,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift8Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 8,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift8End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 8,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift9Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 9,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift9Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 9,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift9End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 9,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	shift10Date: Yup.date().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 10,
		then: Yup.date().required("Please indicate the date of the shift"),
	}),
	shift10Start: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 10,
		then: Yup.string().required("Please indicate the start time of the shift"),
	}),

	shift10End: Yup.string().when("shiftNumber", {
		is: (shiftNumber) => shiftNumber >= 10,
		then: Yup.string().required("Please indicate the end time of the shift"),
	}),
	addInfo: Yup.string(),
	imageUrl: Yup.string().url(
		"Please enter a valid URL that links directly to an image"
	),
	pocName: Yup.string().when("retrievePoc", {
		is: false,
		then: Yup.string().required("Please enter the name of contact person"),
	}),
	pocNo: Yup.string().when("retrievePoc", {
		is: false,
		then: Yup.string("Please enter only numbers")
			.matches(/^[0-9]+$/, "Please enter a 8 digit number")
			.min(8, "Please enter a 8 digit number")
			.max(8, "Please enter a 8 digit number")
			.required("Please enter the mobile number of contact person"),
	}),
	pocEmail: Yup.string().when("retrievePoc", {
		is: false,
		then: Yup.string()
			.email("Please enter a valid email address")
			.required("Please enter the email address of contact person"),
	}),
	retrievePoc: Yup.bool(),
	terms: Yup.bool()
		.required()
		.oneOf(
			[true],
			"Terms and Conditions of Use must be accepted to post a Job"
		),
});
