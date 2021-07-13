import YourProfileStu from "../../components/STU/YourProfileStu";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const YourProfileStuPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInStu() {
		if (currentUser !== null && userType === "student") {
			return <YourProfileStu />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To view your student profile details, please",
							button: "Sign in as NUS Student",
							link: "/sign-in-student",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInStu()}</>;
};
export default YourProfileStuPage;
