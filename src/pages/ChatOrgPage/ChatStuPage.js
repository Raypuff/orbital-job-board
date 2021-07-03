import ChatOrg from "../../components/ORG/ChatOrg";
import { useAuth } from "../../contexts/AuthContext";
import { NotOrg } from "./EmptyStates";

const ChatOrgPage = () => {
	const { currentUser, userType } = useAuth();
	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <ChatOrg />;
		} else {
			return <NotOrg />;
		}
	}

	return <>{isSignedInOrg()}</>;
};

export default ChatOrgPage;
