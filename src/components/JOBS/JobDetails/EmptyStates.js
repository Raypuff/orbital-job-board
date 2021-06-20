import { Link } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import emptyState from "../../../assets/emptyState_noJobs.png";
import styles from "./EmptyStates.module.css";

export const LoadingJobDetails = () => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingWrapper}>
				<Spinner
					animation="border"
					role="status"
					variant="primary"
					className={styles.spinner}
				/>
				<div className={styles.loadingTitle}>Loading job details...</div>
			</div>
		</div>
	);
};

export const NotAvailable = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={emptyState}
					alt="job not available for viewing"
				/>
				<div className={styles.title}>
					This job is not available for viewing
				</div>
				<div className={styles.altAction}>
					If you are an NUS student, click here to
				</div>
				<Link to="/jobs" className={styles.altActionButton}>
					<div className={styles.altActionButtonText}>View jobs</div>
				</Link>
			</div>
		</div>
	);
};

export const StillPending = () => {
	return (
		<Alert variant="warning">
			Your job is still pending approval from CCSGP admins
		</Alert>
	);
};
