import SignInStuForm from "../../components/STU/SignInStuForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignInStuPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return (
				<SignedIn>To sign in as an NUS student, please sign out first</SignedIn>
			);
		} else {
			return <SignInStuForm />;
		}
	}

	return <>{isSignedIn()}</>;
};
export default SignInStuPage;
