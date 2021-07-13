import ChatStu from "../../components/STU/ChatStu";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const ChatStuPage = () => {
	const { currentUser, userType } = useAuth();
	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <ChatStu />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To view your chat, please",
							button: "Sign in as NUS Student",
							link: "/sign-in-student",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInStu()}</>;
};

export default ChatStuPage;
