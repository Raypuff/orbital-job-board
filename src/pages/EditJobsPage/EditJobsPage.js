import EditJobs from "../../components/ORG/EditJobs";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";
import { withRouter } from "react-router-dom";

const EditJobsPage = ({ match }) => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <EditJobs id={match.params.id} />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To edit your jobs, please",
							button: "Sign in as Organization",
							link: "/sign-in-organization",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInOrg()} </>;
};

const EditJobsPageWithRouter = withRouter(EditJobsPage);
export default EditJobsPageWithRouter;
