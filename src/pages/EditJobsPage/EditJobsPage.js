import EditJobs from "../../components/ORG/EditJobs";
import { useAuth } from "../../contexts/AuthContext";
import { NotOrg } from "./EmptyStates";
import { withRouter } from "react-router-dom";

const EditJobsPage = ({ match }) => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <EditJobs id={match.params.id} />;
		} else {
			return <NotOrg />;
		}
	}

	return <>{isSignedInOrg()} </>;
};

const EditJobsPageWithRouter = withRouter(EditJobsPage);
export default EditJobsPageWithRouter;
