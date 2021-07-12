import { Spinner } from "react-bootstrap";
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
				<div className={styles.loadingTitle}>Loading your admin profile...</div>
			</div>
		</div>
	);
};
