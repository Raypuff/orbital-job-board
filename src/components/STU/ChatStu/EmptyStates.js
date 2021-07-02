import emptyState_noJobs from "../../../assets/emptyState_noJobs.png";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./EmptyStates.module.css";

export const LoadingChats = () => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingWrapper}>
				<Spinner
					animation="border"
					role="status"
					variant="primary"
					className={styles.spinner}
				/>
				<div className={styles.loadingTitle}>Loading your chats...</div>
			</div>
		</div>
	);
};

export const NoChats = () => {
	return (
		<div>
			u have no chats - if you have a qn u wna ask org go to the job listing by
			clicking learn more on the job board
		</div>
	);
};

export const LoadingMessages = () => {
	return <div>im loading messages</div>;
};

export const SelectMessage = () => {
	return <div>select a message</div>;
};

export const NoMessage = () => {
	return <div>u have no msg send one?</div>;
};

export const NoApplications = () => {
	return (
		<div className={styles.noJobContainer}>
			<div className={styles.noJobWrapper}>
				<img
					className={styles.noJobImage}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.noJobTitle}>
					You do not have any applications available for viewing...
				</div>
				<div className={styles.noJobOrg}>
					Ready to get involved and make a difference?
				</div>
				<Link to="/jobs" className={styles.noJobButton}>
					<div className={styles.noJobButtonText}>Volunteer now</div>
				</Link>
			</div>
		</div>
	);
};

export const FilterNoApplications = () => {
	return (
		<div className={styles.filterNoJobContainer}>
			<div className={styles.filterNoJobWrapper}>
				<img
					src={emptyState_noJobs}
					alt="Filter no jobs mountains"
					className={styles.filterNoJobImage}
				/>
				<div className={styles.filterNoJobTitle}>
					Hmm... You do not have any applications with the filters you selected.
					Perhaps try a different filter?
				</div>
			</div>
		</div>
	);
};
