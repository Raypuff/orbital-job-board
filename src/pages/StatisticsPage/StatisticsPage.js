import Statistics from "../../components/ADMIN/Statistics";
import { useAuth } from "../../contexts/AuthContext";
import { NotAdmin } from "./EmptyStates";

const StatisticsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <Statistics />;
		} else {
			return <NotAdmin />;
		}
	}

	return <>{isSignedInAdmin()}</>;
};
export default StatisticsPage;
