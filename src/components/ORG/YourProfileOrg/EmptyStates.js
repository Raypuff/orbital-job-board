//react router imports
import { Link } from "react-router-dom";
//bootstrap components import
import { Spinner } from "react-bootstrap";
//image import
import mountains from "../../../assets/emptyStates/mountains-dark.png";
//css modules import
import styles from "./EmptyStates.module.css";

export const LoadingProfile = () => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loadingWrapper}>
				<Spinner
					animation="border"
					role="status"
					variant="primary"
					className={styles.spinner}
				/>
				<div className={styles.loadingTitle}>
					Loading your organization profile...
				</div>
			</div>
		</div>
	);
};

export const NoApplications = () => {
	return (
		<div className={styles.noJobContainer}>
			<div className={styles.noJobWrapper}>
				<img
					className={styles.noJobImage}
					src={mountains}
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
					src={mountains}
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
