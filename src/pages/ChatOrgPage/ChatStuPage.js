import ChatOrg from "../../components/ORG/ChatOrg";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const ChatOrgPage = () => {
	const { currentUser, userType } = useAuth();
	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <ChatOrg />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To view your chat, please",
							button: "Sign in as Organization",
							link: "/sign-in-organization",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInOrg()}</>;
};

export default ChatOrgPage;
