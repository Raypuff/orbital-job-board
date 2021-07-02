import { useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./JobDetailsAdminModal.module.css";

const handleAcceptReject = async (jobId, choice, reason) => {
	var body;
	if (choice === "Approved") {
		body = { status: choice, removalReason: "" };
	} else if (choice === "Rejected" || "TakenDown") {
		body = { status: choice, removalReason: reason };
	}
	try {
		await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs/status/" + jobId, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		window.location.reload(false);
	} catch (err) {
		console.error(err);
	}
};

export const JobDetailsAdminRejModal = ({
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
	const rejReasonRef = useRef();
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>You are rejecting {title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					Are you sure you want to reject this posting?
					<div className={styles.modalContainer}>
						<Form.Label>Please provide a reason why</Form.Label>
						<Form.Control type="text" ref={rejReasonRef} required />
						<Button
							onClick={(event) =>
								handleAcceptReject(id, "Rejected", rejReasonRef.current.value)
							}
							variant="danger"
						>
							Reject posting
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export const AdminOpenRejModalButton = ({ handleClick }) => {
	return (
		<>
			<Button variant="danger" onClick={handleClick}>
				Reject posting
			</Button>
		</>
	);
};

export const JobDetailsAdminAppModal = ({
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
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>You are approving {title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.modalContainer}>
					Are you sure you want to approve this posting?
					<Button
						onClick={(event) => handleAcceptReject(id, "Approved", "")}
						variant="success"
					>
						Approve posting
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export const AdminOpenAppModalButton = ({ handleClick }) => {
	return (
		<>
			<Button variant="success" onClick={handleClick}>
				Approve posting
			</Button>
		</>
	);
};

export const JobDetailsAdminTDModal = ({
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
	const tdReasonRef = useRef();

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>You are taking down {title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form controlId="formTakedownReason">
					<div className={styles.modalContainer}>
						Are you sure you want to take down this posting?
						<Form.Label>Please provide a reason why</Form.Label>
						<Form.Control type="text" ref={tdReasonRef} required />
						<Button
							onClick={(event) => {
								console.log("yeet");
								handleAcceptReject(id, "TakenDown", tdReasonRef.current.value);
							}}
							variant="danger"
							type="submit"
						>
							Take down posting
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export const AdminOpenTDModalButton = ({ handleClick }) => {
	return (
		<>
			<Button variant="danger" onClick={handleClick}>
				Take down posting
			</Button>
		</>
	);
};
