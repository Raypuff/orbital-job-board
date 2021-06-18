import { Modal, Button } from "react-bootstrap";
import styles from "./JobDetailsAdminModal.module.css";

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
		<Modal show={show} onHide={onHide}>
			rejecc
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
		<Modal show={show} onHide={onHide}>
			{" "}
			approve
		</Modal>
	);
};

export const AdminRejButton = ({ handleClick }) => {
	return (
		<>
			<div className={styles.button} onClick={handleClick}>
				Reject
			</div>
		</>
	);
};

export const AdminAppButton = ({ handleClick }) => {
	return (
		<>
			<div className={styles.button} onClick={handleClick}>
				Approve
			</div>
		</>
	);
};
