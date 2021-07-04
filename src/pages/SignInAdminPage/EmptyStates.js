import emptyState_noJobs from "../../assets/emptyState_noJobs.png";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./EmptyStates.module.css";

export const SignedIn = () => {
	const { logout } = useAuth();

	async function handleLogout() {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<img
					className={styles.image}
					src={emptyState_noJobs}
					alt="No jobs mountains"
				/>
				<div className={styles.title}>
					To sign in as an administrator, please sign out first
				</div>
				<div onClick={handleLogout} className={styles.button}>
					<div className={styles.buttonText}>Sign out</div>
				</div>
			</div>
		</div>
	);
};
