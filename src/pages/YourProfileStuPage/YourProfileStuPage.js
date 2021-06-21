import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourProfileStu from "../../components/STU/YourProfileStu";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const YourProfileStuPage = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			<YourProfileStu />
			<Footer />
		</div>
	);
};
export default YourProfileStuPage;
