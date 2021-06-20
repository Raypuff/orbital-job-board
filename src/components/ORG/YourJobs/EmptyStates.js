import emptyState_noJobs from "../../../assets/emptyState_noJobs.png";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./EmptyStates.module.css";

export const LoadingYourJobs = () => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingWrapper}>
				<Spinner
					animation="border"
					role="status"
					variant="primary"
					className={styles.spinner}
				/>
				<div className={styles.loadingTitle}>Loading your jobs...</div>
			</div>
		</div>
	);
};

export const NoYourJobs = () => {
	return (
		<div className={styles.noJobContainer}>
			<div className={styles.noJobWrapper}>
				<img
					className={styles.noJobImage}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.noJobTitle}>
					You do not have any jobs available for viewing...
				</div>
				<div className={styles.noJobOrg}>
					Ready to recruit volunteers for your CIP?
				</div>
				<Link to="/post-a-job" className={styles.noJobButton}>
					<div className={styles.noJobButtonText}>Post a job</div>
				</Link>
			</div>
		</div>
	);
};

export const FilterNoYourJobs = () => {
	return (
		<div className={styles.filterNoJobContainer}>
			<div className={styles.filterNoJobWrapper}>
				<img
					src={emptyState_noJobs}
					alt="Filter no jobs mountains"
					className={styles.filterNoJobImage}
				/>
				<div className={styles.filterNoJobTitle}>
					Hmm... You do not have any jobs with the filters you selected. Perhaps
					try a different filter?
				</div>
			</div>
		</div>
	);
};
