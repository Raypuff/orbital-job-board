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
		<div className={styles.noJobContainer}>
			<div className={styles.noJobWrapper}>
				<img
					className={styles.noJobImage}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.noJobTitle}>You do not have any chats yet </div>
				<div className={styles.noJobOrg}>
					If you would like volunteers to have the option to ask you a question,
					make sure to enable the option when posting a job!
				</div>
				<Link to="/post-a-job" className={styles.noJobButton}>
					<div className={styles.noJobButtonText}>Post A Job</div>
				</Link>
			</div>
		</div>
	);
};

export const SelectMessage = () => {
	return (
		<div className="h-100 d-flex justify-content-center align-items-center">
			<div className="bg-white text-primary px-4 py-2 mb-4 rounded-pill text-center">
				Select a chat to start messaging
			</div>
		</div>
	);
};

export const NoMessage = () => {
	return (
		<div className="h-100 d-flex justify-content-center align-items-center">
			<div className="bg-white text-primary px-4 py-2 mb-4 rounded-pill text-center">
				You have no messages with this volunteer
			</div>
		</div>
	);
};
