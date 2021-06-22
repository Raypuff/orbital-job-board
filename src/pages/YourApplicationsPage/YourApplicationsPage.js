import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourApplications from "../../components/STU/YourApplications";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const YourApplicationsPage = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			<YourApplications />
			<Footer />
		</div>
	);
};
export default YourApplicationsPage;
