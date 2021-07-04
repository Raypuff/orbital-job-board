import SignUpOrgForm from "../../components/ORG/SignUpOrgForm";
import { SignedIn } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignUpOrgPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return <SignedIn />;
		} else {
			return <SignUpOrgForm />;
		}
	}

	return <>{isSignedIn()}</>;
};

export default SignUpOrgPage;
