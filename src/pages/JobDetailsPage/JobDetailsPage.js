import JobDetails from "../../components/JOBS/JobDetails";
import { withRouter } from "react-router-dom";

const JobDetailsPage = ({ match }) => {
	return (
		<>
			<JobDetails id={match.params.id} />
		</>
	);
};

const JobDetailsPageWithRouter = withRouter(JobDetailsPage);
export default JobDetailsPageWithRouter;
