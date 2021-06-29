import YourProfileStu from "../../components/STU/YourProfileStu";
import { useAuth } from "../../contexts/AuthContext";
import { NotStu } from "./EmptyStates";

const YourProfileStuPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <YourProfileStu />;
		} else {
			return <NotStu />;
		}
	}

	return <>{isSignedInStu()}</>;
};
export default YourProfileStuPage;
