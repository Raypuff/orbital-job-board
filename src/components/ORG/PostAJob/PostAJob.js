import { useState, useEffect } from "react";
import {
	Row,
	Col,
	Accordion,
	Card,
	Form,
	Button,
	Alert,
	Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
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
	const [canRetrieveOrgDetails, setCanRetrieveOrgDetails] = useState(false);
	const [canRetrievePocDetails, setCanRetrievePocDetails] = useState(false);

	//finding currentUser that is logged in
	const { currentUser, userVerified } = useAuth();

	//to obtain currentUser data from database
	const [userData, setUserData] = useState(null);

	const [image, setImage] = useState();
	const [imageUrl, setImageUrl] = useState("");
	const [imageLoading, setImageLoading] = useState(false);

	//retrieve user from database
	const getUser = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				"/organization-accounts/" +
				currentUser.email,
			{}
		);
		const jsonData = await response.json();
		setUserData(jsonData);
		const { type, name, uen, pocName, pocNo, pocEmail } = jsonData;
		if (
			(type === "NUS Organization" ||
				(type === "Non-NUS Organization" && uen)) &&
			name
		) {
			setCanRetrieveOrgDetails(true);
		}
		if (pocName && pocNo && pocEmail) {
			setCanRetrievePocDetails(true);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	//image uploader
	const uploadImage = async (event) => {
		setImageLoading(true);
		try {
			const files = event.target.files;
			const data = new FormData();
			data.append("file", files[0]);
			data.append("upload_preset", "volunteer-ccsgp-images");
			const res = await fetch(
				"https://api.cloudinary.com/v1_1/volunteer-ccsgp-job-board/image/upload",
				{
					method: "POST",
					body: data,
				}
			);
			const file = await res.json();
			setImage(file.secure_url);
			setImageUrl(file.secure_url);
		} catch (err) {
			console.log(err);
		}
		setImageLoading(false);
	};

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
				beneficiaries: values.beneficiaries,
				skills: values.skills,
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
				imageUrl: imageUrl,
				pocName: values.retrievePoc ? userData.pocName : values.pocName,
				pocNo: values.retrievePoc ? userData.pocNo : values.pocNo,
				pocEmail: values.retrievePoc ? userData.pocEmail : values.pocEmail,
			};

			try {
				//postjob to jobs database
				const body = { newJob };
				await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				});

				const body2 = {
					newJobID: jobID,
				};

				await fetch(
					process.env.REACT_APP_BACKEND_URL +
						"/organization-accounts/job/" +
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
				enableReinitialize
				initialValues={{
					title: "",
					beneficiaries: "",
					skills: "",
					purpose: "",
					platform: "",
					multiLocation: false,
					location: "",
					postalCode: "",
					type: "",
					flexiDate: false,
					longStartDate: "",
					longEndDate: "",
					flexiHours: false,
					longHours: "",
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
						{console.log(values.beneficiaries)}
						<>
							<Card>
								<Accordion defaultActiveKey="0">
									{/* Accordion 1: Organization Details (These details are not collected in this form) */}
									<Accordion.Toggle as={Card.Header} eventKey="0">
										<h5>Organization Details</h5>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
										<div className={styles.accordionBox}>
											{!canRetrieveOrgDetails && (
												<Alert variant="danger">
													<Alert.Heading as="h6">
														Missing organization details
													</Alert.Heading>
													<hr />
													<p>
														Please{" "}
														<Link to="/profile-organization">
															fill in your organization details
														</Link>{" "}
														on your profile before proceeding to post a job.
														Thank you!
													</p>
												</Alert>
											)}
											<Form.Group controlId="formOrgType">
												<Form.Label>Organization type</Form.Label>
												<Form.Control
													required
													placeholder={userData !== null ? userData.type : ""}
													readOnly
												/>
											</Form.Group>
											<Form.Group controlId="formOrgName">
												<Form.Label>Organization name</Form.Label>
												<Form.Control
													required
													placeholder={userData !== null ? userData.name : ""}
													readOnly
												/>
											</Form.Group>
											<Form.Group controlId="formOrgUen">
												<Form.Label>
													Organization UEN, Charity registration number or
													Society registration number
													<Form.Text className="text-muted">
														Only applicable for Non-NUS Organizations
													</Form.Text>
												</Form.Label>
												<Form.Control
													required
													placeholder={userData !== null ? userData.uen : ""}
													readOnly
												/>
											</Form.Group>
											<Form.Group controlId="formOrgEmail">
												<Form.Label>Email address of Organization</Form.Label>
												<Form.Control
													required
													placeholder={userData !== null ? userData.id : ""}
													readOnly
												/>
											</Form.Group>
										</div>
									</Accordion.Collapse>
								</Accordion>
								{/* Accordion 2: Job Details */}
								<Accordion>
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
												<Form.Label>
													Target profile of beneficiary
													<Form.Text className="text-muted">
														Hold Ctrl (Windows) or CMD (Mac) to select multiple
														options
													</Form.Text>
												</Form.Label>
												<Form.Control
													name="beneficiaries"
													onChange={handleChange}
													onBlur={handleBlur}
													values={values.beneficiaries}
													isValid={
														touched.beneficiaries && !errors.beneficiaries
													}
													isInvalid={
														touched.beneficiaries && errors.beneficiaries
													}
													as="select"
													multiple
												>
													{BeneficiaryTags.map((beneficiary) => (
														<option>{beneficiary}</option>
													))}
												</Form.Control>
												<Form.Control.Feedback type="invalid">
													{errors.beneficiaries}
												</Form.Control.Feedback>
												<Form.Text className="text-muted">
													For 'Other', you can elaborate in the Additional
													information section
												</Form.Text>
											</Form.Group>
											<Form.Group controlId="formSkills">
												<Form.Label>
													Skills required
													<Form.Text className="text-muted">
														Hold Ctrl (Windows) or CMD (Mac) to select multiple
														options
													</Form.Text>
												</Form.Label>
												<Form.Control
													name="skills"
													onChange={handleChange}
													onBlur={handleBlur}
													values={values.skills}
													isValid={touched.skills && !errors.skills}
													isInvalid={touched.skills && errors.skills}
													as="select"
													multiple
												>
													{SkillTags.map((skill) => (
														<option>{skill}</option>
													))}
												</Form.Control>
												<Form.Control.Feedback type="invalid">
													{errors.skills}
												</Form.Control.Feedback>
												<Form.Text className="text-muted">
													For 'Others', you can elaborate in the Additional
													information section
												</Form.Text>
											</Form.Group>
											<Form.Group controlId="formPurpose">
												<Form.Label>
													Purpose of volunteer work
													<Form.Text className="text-muted">
														Do explain what volunteers would be doing and why
														they are doing it. It would also be useful to
														elaborate how volunteers can benefit from the
														experience.
													</Form.Text>
												</Form.Label>
												<Form.Control
													type="text"
													as="textarea"
													rows={2}
													name="purpose"
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
													<option value="" disabled selected />
													<option>Physical</option>
													<option>Virtual</option>
												</Form.Control>
												<Form.Control.Feedback type="invalid">
													{errors.platform}
												</Form.Control.Feedback>
											</Form.Group>
											<div
												className={
													values.platform !== "Physical"
														? styles.typeDisplayNone
														: styles.typeDisplay
												}
											>
												<Row>
													<Col md={8}>
														<Form.Group controlId="formLocation">
															<Form.Label>
																Location of volunteer work
															</Form.Label>

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
																isValid={
																	touched.postalCode && !errors.postalCode
																}
																isInvalid={
																	touched.postalCode && errors.postalCode
																}
															/>
															<Form.Control.Feedback type="invalid">
																{errors.postalCode}
															</Form.Control.Feedback>
															<Form.Text className="text-muted">
																The postal code will be used to display the
																distance of the job from volunteers
															</Form.Text>
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
													<option value="" disabled selected />
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
																	values.type !== "Long term" ||
																	values.flexiDate
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
																	values.type !== "Long term" ||
																	values.flexiDate
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
																min={new Date().toISOString().substring(0, 10)}
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
													<Form.Label>
														Ad hoc - Number of shifts
														<Form.Text className="text-muted">
															If the shifts are flexible or have not been
															confirmed yet, you can leave the Number of shifts
															as 0
														</Form.Text>
													</Form.Label>
													<Form.Control
														name="shiftNumber"
														disabled={values.type !== "Ad hoc"}
														placeholder={
															values.type !== "Ad hoc"
																? null
																: values.shiftNumber
														}
														type="number"
														min="0"
														max="10"
														onChange={handleChange}
														onBlur={handleBlur}
														isValid={touched.shiftNumber && !errors.shiftNumber}
														isInvalid={
															touched.shiftNumber && errors.shiftNumber
														}
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
												<Form.Label>
													Additional information
													<Form.Text className="text-muted">
														Here you can indicate any other relevant information
														that would be good for the volunteers to know
													</Form.Text>
												</Form.Label>
												<Form.Control
													name="addInfo"
													type="text"
													as="textarea"
													rows={2}
													value={values.addInfo}
													onChange={handleChange}
													onBlur={handleBlur}
													isValid={touched.addInfo && !errors.addInfo}
													isInvalid={touched.addInfo && errors.addInfo}
												/>
												<Form.Control.Feedback type="invalid">
													{errors.addInfo}
												</Form.Control.Feedback>
											</Form.Group>
											<Form.Group>
												<Form.Label>
													Upload image
													<Form.Text className="text-muted">
														An image that best captures the essence of the
														volunteer job would be helpful in attracting more
														volunteers
													</Form.Text>
												</Form.Label>
												<Form.Control
													name="file"
													type="file"
													onChange={uploadImage}
													accept="image/*"
												/>
												<div className={styles.imageContainer}>
													{imageLoading ? (
														<Spinner
															animation="border"
															role="status"
															variant="primary"
														>
															<span className="sr-only">Loading...</span>
														</Spinner>
													) : image ? (
														<img
															src={image}
															className={styles.image}
															alt="Volunteer"
														/>
													) : null}
												</div>
											</Form.Group>
										</div>
									</Accordion.Collapse>
								</Accordion>
								{/* Contact details */}
								<Accordion>
									<Accordion.Toggle as={Card.Header} eventKey="2">
										<h5>Contact Details</h5>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="2">
										<div className={styles.accordionBox}>
											<Form.Group controlId="formRetrievePoc">
												<Form.Check
													name="retrievePoc"
													label="Retrieve contact details from your profile"
													checked={values.retrievePoc}
													onChange={handleChange}
													onBlur={handleBlur}
													feedback={errors.retrievePoc}
													disabled={!canRetrievePocDetails}
												/>
												<Form.Text>
													{!canRetrievePocDetails && (
														<Alert variant="warning">
															You need to fill in your contact details on{" "}
															<Link to="/profile-organization">
																your profile
															</Link>{" "}
															before we can help you autofill the form
														</Alert>
													)}
												</Form.Text>
											</Form.Group>
											<Form.Group controlId="formPocName">
												<Form.Label>Name of contact person</Form.Label>
												<Form.Control
													name="pocName"
													type="text"
													readOnly={values.retrievePoc}
													placeholder={
														userData !== null ? userData.pocName : ""
													}
													value={
														values.retrievePoc
															? userData.pocName
															: values.pocName
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
													placeholder={
														userData !== null ? userData.pocEmail : ""
													}
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
										</div>
									</Accordion.Collapse>
								</Accordion>
								{/* Terms */}
								<Accordion>
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
								</Accordion>
							</Card>
							<Card.Text />
							{!canRetrieveOrgDetails && (
								<Alert variant="danger">
									You need to{" "}
									<Link to="/profile-organization">
										fill in your organization details
									</Link>{" "}
									before you are able to post a job. Thank you!
								</Alert>
							)}
							<Card.Text />
							<Button
								disabled={!canRetrieveOrgDetails || isSubmitting || message}
								variant="primary"
								type="submit"
							>
								Post job
							</Button>
							<Card.Text />
							{error && <Alert variant="danger">{error}</Alert>}
							{isSubmitting && (
								<Alert variant="primary">Posting your job...</Alert>
							)}
							{message && (
								<Alert variant="success">
									<Alert.Heading as="h6">{message}</Alert.Heading>
									<hr />
									<p className="mb-0">
										Your job will be publicly available once it has been
										approved by an administrator
									</p>
								</Alert>
							)}
						</>
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
		"Please indicate the purpose of the volunteer job"
	),
	beneficiaries: Yup.array("Please select at least one beneficiary")
		.of(Yup.string())
		.required("Please select at least one beneficiary"),
	skills: Yup.array("Please select at least one skill")
		.of(Yup.string())
		.required("Please select at least one skill"),
	platform: Yup.string().required(
		"Please indicate if the volunteer platform is physical or virtual"
	),
	multiLocation: Yup.bool(),
	location: Yup.string().when(["platform", "multiLocation"], {
		is: (platform, multiLocation) =>
			platform === "Physical" && multiLocation !== true,
		then: Yup.string().required(
			"Please indicate the location of the volunteer job"
		),
	}),
	postalCode: Yup.string().when(["platform", "multiLocation"], {
		is: (platform, multiLocation) =>
			platform === "Physical" && multiLocation !== true,
		then: Yup.string("Please enter a 6 digit number")
			.matches(/^[0-9]+$/, "Please enter a 6 digit number")
			.min(6, "Please enter a 6 digit number")
			.max(6, "Please enter a 6 digit number")
			.required("Please indicate the postal code of the volunteer job"),
	}),
	type: Yup.string().required(
		"Please indicate if the commitment type is long term or ad hoc"
	),
	flexiDate: Yup.bool(),
	longStartDate: Yup.date().when(["type", "flexiDate"], {
		is: (type, flexiDate) => type === "Long term" && flexiDate !== true,
		then: Yup.date().required(
			"Please indicate the start date of the volunteer job (If the date is flexible, tick 'Start and end dates are flexible'"
		),
	}),
	longEndDate: Yup.date().when(["type", "flexiDate"], {
		is: (type, flexiDate) => type === "Long term" && flexiDate !== true,
		then: Yup.date().required(
			"Please indicate the end date of the volunteer job (If the date is flexible, tick 'Start and end dates are flexible'"
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

/*
                      <Form.Group controlId="formImageUrl">
                        <Form.Label>
                          Image URL
                          <Form.Text className="text-muted">
                            If you would like to include an image with your
                            posting, upload it on an image hosting site and
                            paste the direct link below
                          </Form.Text>
                        </Form.Label>
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
                      */
