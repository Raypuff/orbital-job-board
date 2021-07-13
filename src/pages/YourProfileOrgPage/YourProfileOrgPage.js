import YourProfileOrg from "../../components/ORG/YourProfileOrg";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const YourProfileOrgPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <YourProfileOrg />;
		} else {
			return (
				<Empty
					action={[
						{
							tip: "To view your organization profile details, please",
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
export default YourProfileOrgPage;
