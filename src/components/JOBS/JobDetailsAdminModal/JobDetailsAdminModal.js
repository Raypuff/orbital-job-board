import styles from "./JobDetailsAdminModal.module.css";

const JobDetailsAdminModal = () => {
	return <div>i am an admin and im here to reject/accept jobs</div>;
};
export default JobDetailsAdminModal;

export const AdminButton = ({ handleClick }) => {
	return (
		<div className={styles.button} onClick={handleClick}>
			Reject/Approve
		</div>
	);
};
