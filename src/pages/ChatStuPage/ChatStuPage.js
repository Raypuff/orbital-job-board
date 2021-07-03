import ChatStu from "../../components/STU/ChatStu";
import { useAuth } from "../../contexts/AuthContext";
import { NotStu } from "./EmptyStates";

const ChatStuPage = () => {
	const { currentUser, userType } = useAuth();
	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <ChatStu />;
		} else {
			return <NotStu />;
		}
	}

	return <>{isSignedInStu()}</>;
};

export default ChatStuPage;
