import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import AllJobs from "../../components/ADMIN/AllJobs";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { NotAdmin } from "./EmptyStates";

const AllJobsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <AllJobs />;
		} else {
			return <NotAdmin />;
		}
	}

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			{isSignedInAdmin()}
			<Footer />
		</div>
	);
};
export default AllJobsPage;
