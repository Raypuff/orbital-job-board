import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourProfileOrg from "../../components/ORG/YourProfileOrg";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { NotOrg } from "./EmptyStates";

const YourProfileOrgPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <YourProfileOrg />;
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
export default YourProfileOrgPage;
