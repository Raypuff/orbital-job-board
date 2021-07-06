import emptyState_noJobs from "../../assets/emptyState_noJobs.png";
import { Link } from "react-router-dom";
import styles from "./EmptyStates.module.css";

export const NotVerifiedOrg = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.title}>
					To post a job, please verify your account by clicking the link in your
					email first. Thank you!
					<br />
					Didn't receive a verification email? Proceed to your profile details
					to resend a verification email!
				</div>
				<Link to="/profile-organization" className={styles.button}>
					<div className={styles.buttonText}>Your Profile</div>
				</Link>
			</div>
		</div>
	);
};

export const NotOrg = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.title}>To post a job, please</div>
				<Link to="/sign-in-organization" className={styles.button}>
					<div className={styles.buttonText}>Sign in as Organization</div>
				</Link>
			</div>
		</div>
	);
};
