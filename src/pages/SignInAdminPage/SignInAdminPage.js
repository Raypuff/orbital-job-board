import SignInAdminForm from "../../components/ADMIN/SignInAdminForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignInAdminPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return (
				<SignedIn>To sign in as Administrator, please sign out first</SignedIn>
			);
		} else {
			return <SignInAdminForm />;
		}
	}

	return <>{isSignedIn()}</>;
};

export default SignInAdminPage;
