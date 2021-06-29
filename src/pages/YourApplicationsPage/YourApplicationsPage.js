import YourApplications from "../../components/STU/YourApplications";
import { useAuth } from "../../contexts/AuthContext";
import { NotStu } from "./EmptyStates";

const YourApplicationsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <YourApplications />;
		} else {
			return <NotStu />;
		}
	}

	return <>{isSignedInStu()}</>;
};
export default YourApplicationsPage;
