import EditJobs from "../../components/ORG/EditJobs";
import { withRouter } from "react-router-dom";

const EditJobsPage = ({ match }) => {
	return (
		<>
			<EditJobs id={match.params.id} />
		</>
	);
};

const EditJobsPageWithRouter = withRouter(EditJobsPage);
export default EditJobsPageWithRouter;
