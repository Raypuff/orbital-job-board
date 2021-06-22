import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Footer from "../../components/Footer";
import PostAJob from "../../components/ORG/PostAJob";
import { NotVerifiedOrg, NotOrg } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const PostAJobPage = () => {
	const { currentUser, userType, userVerified } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization" && userVerified) {
			return <PostAJob />;
		} else if (
			currentUser !== null &&
			userType === "organization" &&
			!userVerified
		) {
			return <NotVerifiedOrg />;
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
