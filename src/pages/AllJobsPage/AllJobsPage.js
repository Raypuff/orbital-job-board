import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import AllJobs from "../../components/ADMIN/AllJobs";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const AllJobsPage = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			<AllJobs />
			<Footer />
		</div>
	);
};
export default AllJobsPage;
