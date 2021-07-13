import AllJobs from "../../components/ADMIN/AllJobs";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const AllJobsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <AllJobs />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To view all jobs, please",
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
export default AllJobsPage;
