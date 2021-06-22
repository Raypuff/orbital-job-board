import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import SignInOrgForm from "../../components/ORG/SignInOrgForm";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const SignInOrgPage = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			<SignInOrgForm />
			<Footer />
		</div>
	);
};

export default SignInOrgPage;
