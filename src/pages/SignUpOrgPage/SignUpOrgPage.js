import SignUpOrgForm from "../../components/ORG/SignUpOrgForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignUpOrgPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return (
				<SignedIn>
					To sign up as an organization, please sign out first
				</SignedIn>
			);
		} else {
			return <SignUpOrgForm />;
		}
	}

	return <>{isSignedIn()}</>;
};

export default SignUpOrgPage;
