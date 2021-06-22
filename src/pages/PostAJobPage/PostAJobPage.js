import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Footer from "../../components/Footer";
import PostAJob from "../../components/ORG/PostAJob";
import { NotOrg } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const PostAJobPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization") {
			return <PostAJob />;
		} else {
			return <NotOrg />;
		}
	}

	return (
		<>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			{isSignedInOrg()}
			<Footer />
		</>
	);
};
export default PostAJobPage;
