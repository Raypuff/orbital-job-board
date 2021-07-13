import YourApplications from "../../components/STU/YourApplications";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const YourApplicationsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <YourApplications />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To view your job applications, please",
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
export default YourApplicationsPage;
