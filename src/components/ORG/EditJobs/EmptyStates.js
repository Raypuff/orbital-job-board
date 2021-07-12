import emptyState_noJobs from "../../../assets/emptyState_noJobs.png";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./EmptyStates.module.css";

export const LoadingJob = () => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingWrapper}>
				<Spinner
					animation="border"
					role="status"
					variant="primary"
					className={styles.spinner}
				/>
				<div className={styles.loadingTitle}>Loading ...</div>
			</div>
		</div>
	);
};

export const NotYourJob = () => {
	return (
		<div className={styles.noJobContainer}>
			<div className={styles.noJobWrapper}>
				<img
					className={styles.noJobImage}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.noJobTitle}>
					Sorry! It seems you have stumbled across a job that is not yours.
				</div>
				<div className={styles.noJobOrg}>To view your own jobs, proceed to</div>
				<Link to="/your-jobs" className={styles.noJobButton}>
					<div className={styles.noJobButtonText}>Your Jobs</div>
				</Link>
			</div>
		</div>
	);
};

export const NoJobs = () => {
	return (
		<div className={styles.noJobContainer}>
			<div className={styles.noJobWrapper}>
				<img
					className={styles.noJobImage}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.noJobTitle}>
					There are no available jobs for viewing...
				</div>
				<div className={styles.noJobOrg}>
					If you are an organization, click here to
				</div>
				<Link to="/post-a-job" className={styles.noJobButton}>
					<div className={styles.noJobButtonText}>Post a job</div>
				</Link>
				{/* <div className={styles.noJobStu}>
					If you are an NUS student, click here to
				</div>
				<div className={styles.noJobStuButton}>Subscribe to notifications</div> */}
			</div>
		</div>
	);
};

export const FilterNoJobs = () => {
	return (
		<div className={styles.filterNoJobContainer}>
			<div className={styles.filterNoJobWrapper}>
				<img
					src={emptyState_noJobs}
					alt="Filter no jobs mountains"
					className={styles.filterNoJobImage}
				/>
				<div className={styles.filterNoJobTitle}>
					Hmm... There are no jobs with the filters you selected. Perhaps try a
					different filter?
				</div>
			</div>
		</div>
	);
};
