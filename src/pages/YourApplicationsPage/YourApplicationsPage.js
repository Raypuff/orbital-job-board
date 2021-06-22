import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourApplications from "../../components/STU/YourApplications";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { NotStu } from "./EmptyStates";

const YourApplicationsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <YourApplications />;
		} else {
			return <NotStu />;
		}
	}

	return (
		<>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			{isSignedInStu()}
			<Footer />
		</>
	);
};
export default YourApplicationsPage;
