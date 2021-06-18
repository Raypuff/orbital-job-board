import { Alert } from "react-bootstrap";

export const NotAvailable = () => {
	return <div>this job is not available for viewing</div>;
};

export const StillPending = () => {
	return (
		<Alert variant="warning">
			Your job is still pending approval from CCSGP admins
		</Alert>
	);
};
