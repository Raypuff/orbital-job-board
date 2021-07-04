import SignInOrgForm from "../../components/ORG/SignInOrgForm";
import { SignedIn } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignInOrgPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return <SignedIn />;
		} else {
			return <SignInOrgForm />;
		}
	}

	return <>{isSignedIn()}</>;
};

export default SignInOrgPage;
