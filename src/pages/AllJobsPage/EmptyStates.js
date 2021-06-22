import emptyState_noJobs from "../../assets/emptyState_noJobs.png";
import { Link } from "react-router-dom";
import styles from "./EmptyStates.module.css";

export const NotAdmin = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.title}>To view all jobs, please</div>
				<Link to="/sign-in-admin" className={styles.button}>
					<div className={styles.buttonText}>Sign in as Administrator</div>
				</Link>
			</div>
		</div>
	);
};
