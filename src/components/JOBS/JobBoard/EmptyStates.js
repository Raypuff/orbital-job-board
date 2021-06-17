import { Spinner } from "react-bootstrap";

export const LoadingJobs = () => {
	return (
		<Spinner animation="border" role="status">
			<span className="sr-only">Loading....</span>
		</Spinner>
	);
};

export const NoJobs = () => {
	return <div>no jobs</div>;
};

export const FilterNoJobs = () => {
	return <div>no jobs with filter</div>;
};
