import emptyState_noJobs from "../../assets/emptyState_noJobs.png";
import { Link } from "react-router-dom";
import styles from "./EmptyStates.module.css";

export const NotStu = () => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.title}>
					To view your student job applications, please
				</div>
				<Link to="/sign-in-student" className={styles.button}>
					<div className={styles.buttonText}>Sign in as NUS Student</div>
				</Link>
			</div>
		</div>
	);
};
