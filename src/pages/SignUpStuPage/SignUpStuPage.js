import SignUpStuForm from "../../components/STU/SignUpStuForm";
import { SignedIn } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignUpStuPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return (
				<SignedIn>To sign up as an NUS student, please sign out first</SignedIn>
			);
		} else {
			return <SignUpStuForm />;
		}
	}

	return <>{isSignedIn()}</>;
};
export default SignUpStuPage;
