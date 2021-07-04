import SignInStuForm from "../../components/STU/SignInStuForm";
import { SignedIn } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignInStuPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return <SignedIn />;
		} else {
			return <SignInStuForm />;
		}
	}

	return <>{isSignedIn()}</>;
};
export default SignInStuPage;
