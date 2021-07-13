import Statistics from "../../components/ADMIN/Statistics";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const StatisticsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <Statistics />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To view statistics, please",
							button: "Sign in as Administrator",
							link: "/sign-in-admin",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInAdmin()}</>;
};
export default StatisticsPage;
