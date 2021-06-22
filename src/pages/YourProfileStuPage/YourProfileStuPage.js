import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourProfileStu from "../../components/STU/YourProfileStu";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { NotStu } from "./EmptyStates";

const YourProfileStuPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <YourProfileStu />;
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
export default YourProfileStuPage;
