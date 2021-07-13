import SignInOrgForm from "../../components/ORG/SignInOrgForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignInOrgPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return (
				<SignedIn>
					To sign in as an organization, please sign out first
				</SignedIn>
			);
		} else {
			return <SignInOrgForm />;
		}
	}

	return <>{isSignedIn()}</>;
};

export default SignInOrgPage;
