import AllJobs from "../../components/ADMIN/AllJobs";
import { useAuth } from "../../contexts/AuthContext";
import { NotAdmin } from "./EmptyStates";

const AllJobsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <AllJobs />;
		} else {
			return <NotAdmin />;
		}
	}

	return <>{isSignedInAdmin()}</>;
};
export default AllJobsPage;
