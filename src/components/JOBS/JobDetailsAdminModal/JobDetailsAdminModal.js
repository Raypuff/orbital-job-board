import { Modal, Button } from "react-bootstrap";
import styles from "./JobDetailsAdminModal.module.css";

const handleAcceptReject = async (jobId, choice) => {
	const body = { status: choice };
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
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>You are rejecting {title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.modalContainer}>
					Are you sure you want to reject this posting?
					<Button
						onClick={(event) => handleAcceptReject(id, "Rejected")}
						variant="danger"
					>
						Reject posting
					</Button>
				</div>
			</Modal.Body>
		</Modal>
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
						onClick={(event) => handleAcceptReject(id, "Approved")}
						variant="success"
					>
						Approve posting
					</Button>
				</div>
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

export const AdminOpenAppModalButton = ({ handleClick }) => {
	return (
		<>
			<Button variant="success" onClick={handleClick}>
				Approve posting
			</Button>
		</>
	);
};
