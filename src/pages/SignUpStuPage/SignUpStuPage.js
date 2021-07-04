import SignUpStuForm from "../../components/STU/SignUpStuForm";
import { SignedIn } from "./EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const SignUpStuPage = () => {
	const { currentUser } = useAuth();

	function isSignedIn() {
		if (currentUser) {
			return <SignedIn />;
		} else {
			return <SignUpStuForm />;
		}
	}

	return <>{isSignedIn()}</>;
};
export default SignUpStuPage;
