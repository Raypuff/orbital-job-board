import YourJobs from "../../components/ORG/YourJobs";
import { useAuth } from "../../contexts/AuthContext";
import { NotOrg } from "./EmptyStates";

const YourJobsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <YourJobs />;
		} else {
			return <NotOrg />;
		}
	}

	return <>{isSignedInOrg()}</>;
};
export default YourJobsPage;
