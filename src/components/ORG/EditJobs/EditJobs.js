import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import EditJobsModal from "./EditJobsModal";
import ConfirmModal from "./ConfirmModal";
import {
	Row,
	Col,
	Accordion,
	Card,
	Form,
	Button,
	Alert,
	Spinner,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { LoadingJob, NotYourJob } from "./EmptyStates";
import { PencilSquare } from "react-bootstrap-icons";
import noImage from "../../../assets/noImage.png";
import styles from "./EditJobs.module.css";

const EditJobs = ({ id }) => {
	const { currentUser, userType } = useAuth();
	const [job, setJob] = useState({});
	const [loading, setLoading] = useState(true);
	const [imageSrc, setImageSrc] = useState("");
	const [showEditModal, setShowEditModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [editMode, setEditMode] = useState("");

	const getData = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL + "/jobs/" + id
		);
		const jsonData = await response.json();
		// const response2 = await fetch(
		//   process.env.REACT_APP_BACKEND_URL +
		//     "/organization-accounts/" +
		//     jsonData.orgID
		// );
		// const jsonData2 = await response2.json();
		setJob(jsonData);
		setImageSrc(jsonData.imageUrl);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	const {
		orgID,
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
		flexiShifts,
		adShift,
		addInfo,
		imageUrl,
		closingDate,
		noClosingDate,
		pocName,
		pocNo,
		pocEmail,
		dateCreated,
		datePosted,
		applicants,
		lat,
		lng,
	} = job;

	const tooltipDict = {
		image: "image",
		title: "title",
		closingDate: "closing date",
		beneficiaries: "beneficiaries",
		skills: "skils",
		purpose: "purpose",
		location: "location",
		commitment: "commitment period",
		addInfo: "additional information",
		contact: "contact information",
	};

	const EditButton = ({ mode }) => (
		<OverlayTrigger
			placement="bottom"
			overlay={(props) => (
				<Tooltip id="tooltip" {...props}>
					Edit {tooltipDict[mode]}
				</Tooltip>
			)}
		>
			<PencilSquare
				style={{
					fontSize: "1rem",
					color: "#193f76",
					cursor: "pointer",
					marginLeft: "auto",
				}}
				onClick={() => {
					setShowEditModal(true);
					setEditMode(mode);
				}}
			/>
		</OverlayTrigger>
	);

	if (loading) {
		return <LoadingJob />;
	}
	if (orgID !== currentUser.email) {
		return <NotYourJob />;
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Alert variant="warning">
						Your edits will not be saved untill you click "Confirm changes"
					</Alert>
					<Row>
						<Col md={2}>
							<div className={styles.imageCol}>
								<div className="d-flex">
									<EditButton mode="image" />
								</div>
								<img
									className={styles.image}
									src={imageSrc}
									onError={() => setImageSrc(noImage)}
									alt="volunteer"
								/>
							</div>
						</Col>
						<Col md={6}>
							<div className={styles.detailCol}>
								<div className={styles.detailContainer}>
									<h4 className="d-flex align-items-center">
										{title}
										<EditButton mode="title" />
									</h4>
									<hr className={styles.divider} />
									{datePosted && (
										<h7>
											{`Posted on: ${new Date(datePosted).toDateString()}`}
											<br />
										</h7>
									)}

									<div className="d-flex align-items-center">
										{noClosingDate
											? "No closing date for applications"
											: `Applications close on: ${new Date(
													closingDate
											  ).toDateString()}`}
										<EditButton mode="closingDate" />
									</div>
									<hr />
									<h5>About</h5>
									<div className={styles.lineWrapper}>
										<div className="d-flex align-items-center">
											Beneficiaries:
											<EditButton mode="beneficiaries" />
											<br />{" "}
										</div>
										{beneficiaries.map((beneficiary, index) => {
											if (index + 1 !== beneficiaries.length) {
												return <h7 key={index}>{`${beneficiary}, `}</h7>;
											} else {
												return <h7 key={index}>{beneficiary}</h7>;
											}
										})}
									</div>
									<div className={styles.lineWrapper}>
										<div className="d-flex align-items-center">
											Skills:
											<EditButton mode="skills" />
											<br />{" "}
										</div>
										{skills.map((skill, index) => {
											if (index + 1 !== skills.length) {
												return <h7 key={index}>{`${skill}, `}</h7>;
											} else {
												return <h7 key={index}>{skill}</h7>;
											}
										})}
									</div>
									<div className="d-flex">
										Purpose:
										<EditButton mode="purpose" />
										<br />{" "}
									</div>
									<h7>{purpose}</h7>
								</div>
								<div className={styles.detailContainer}>
									<h5 className="d-flex align-items-center">
										Location
										<EditButton mode="location" />
									</h5>
									<h7>Platform: </h7>
									<h7>
										{platform}
										<br />
									</h7>
									<div
										className={
											platform === "Physical"
												? styles.display
												: styles.displayNone
										}
									>
										<h7>Location: </h7>
										<h7>
											{platform !== "Physical" || multiLocation === true
												? "Multiple locations"
												: location}
										</h7>
										<div
											className={
												multiLocation === true
													? styles.displayNone
													: styles.display
											}
										>
											<h7>Postal code: </h7>
											<h7>{`S(${postalCode}) `}</h7>
										</div>
									</div>
								</div>
								<div className={styles.detailContainer}>
									<h5 className="d-flex align-items-center">
										Commitment period
										<EditButton mode="commitment" />
									</h5>
									<h7>Commitment type: </h7>
									<h7>
										{type}
										<br />
									</h7>
									<div
										className={
											type === "Long term" ? styles.display : styles.displayNone
										}
									>
										<h7>Dates: </h7>
										<h7>
											{type === "Long term"
												? !flexiDate
													? `${new Date(
															longStartDate
													  ).toDateString()} - ${new Date(
															longEndDate
													  ).toDateString()}`
													: "Flexible start and end date"
												: ""}
											<br />
										</h7>
										<h7>Required hours: </h7>
										<h7>
											{flexiHours === false
												? longHours
												: "Flexible required hours"}
											<br />
										</h7>
									</div>
									<div
										className={
											type === "Ad hoc" ? styles.display : styles.displayNone
										}
									>
										<div className={styles.shiftWrapper}>
											<h7>{`Shifts:${" "}`}</h7>
											<span>
												{type === "Ad hoc" ? (
													!flexiShifts ? (
														adShift && adShift.length > 0 ? (
															<ol>
																{adShift.map((shift, index) => (
																	<li key={index}>
																		<h7>
																			{`${new Date(
																				shift.date
																			).toDateString()} ${tConvert(
																				shift.startTime
																			)} - ${tConvert(shift.endTime)}`}
																		</h7>
																	</li>
																))}
															</ol>
														) : (
															"No shifts indicated"
														)
													) : (
														"Flexible shifts"
													)
												) : (
													""
												)}
											</span>
										</div>
									</div>
								</div>
								<div>
									<h5 className="d-flex align-items-center">
										Additional information
										<EditButton mode="addInfo" />
									</h5>
									<h7>{addInfo}</h7>
								</div>
							</div>
						</Col>
						<Col md={4}>
							<div className={styles.orgCol}>
								<div className={styles.orgContainer}>
									<h5 className="d-flex align-items-center">
										Contact us
										<EditButton mode="contact" />
									</h5>
									<hr className={styles.divider} />
									<h7>
										{pocName}
										<br />
									</h7>
									<h7>
										{pocNo}
										<br />
									</h7>
									<h7>
										<a href={`mailto:${pocEmail}`}>{pocEmail}</a>
									</h7>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={2} />
						<Col md={6}>
							<div className={styles.buttonRow}>
								<div
									className={styles.button}
									onClick={() => {
										setShowConfirmModal(true);
									}}
								>
									Confirm changes
								</div>
							</div>
						</Col>
						<Col md={4} />
					</Row>
				</div>
			</div>
			<EditJobsModal
				job={job}
				setJob={setJob}
				setImageSrc={setImageSrc}
				tooltipDict={tooltipDict}
				editMode={editMode}
				show={showEditModal}
				onHide={() => setShowEditModal(false)}
			/>
			<ConfirmModal
				job={job}
				show={showConfirmModal}
				onHide={() => setShowConfirmModal(false)}
			/>
		</>
	);
};

export default EditJobs;

function tConvert(time) {
	// Check correct time format and split into components
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
		time,
	];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(""); // return adjusted time or original string
}
