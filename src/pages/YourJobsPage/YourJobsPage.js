import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourJobs from "../../components/ORG/YourJobs";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { NotOrg } from "./EmptyStates";

const YourJobsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <YourJobs />;
		} else {
			return <NotOrg />;
		}
	}

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			{isSignedInOrg()}
			<Footer />
		</div>
	);
};
export default YourJobsPage;
