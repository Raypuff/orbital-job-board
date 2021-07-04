import SignInAdminForm from "../../components/ADMIN/SignInAdminForm";
import { SignedIn } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignInAdminPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return <SignedIn />;
		} else {
			return <SignInAdminForm />;
		}
	}

	return <>{isSignedIn()}</>;
};

export default SignInAdminPage;
