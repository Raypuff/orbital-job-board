import YourProfileOrg from "../../components/ORG/YourProfileOrg";
import { useAuth } from "../../contexts/AuthContext";
import { NotOrg } from "./EmptyStates";

const YourProfileOrgPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <YourProfileOrg />;
		} else {
			return <NotOrg />;
		}
	}

	return <>{isSignedInOrg()}</>;
};
export default YourProfileOrgPage;
