import PostAJob from "../../components/ORG/PostAJob";
import { Empty } from "../../components/EmptyStates/EmptyStates";
import { useAuth } from "../../contexts/AuthContext";

const PostAJobPage = () => {
	const { currentUser, userType, userVerified } = useAuth();

	function isSignedInOrg() {
		if (currentUser !== null && userType === "organization" && userVerified) {
			return <PostAJob />;
		} else if (
			currentUser !== null &&
			userType === "organization" &&
			!userVerified
		) {
			return (
				<Empty
					title={
						"To post a job, please verify your account by clicking the link in your email first. Thank you!"
					}
					actions={[
						{
							tip: "Didn't receive a verification email? Proceed to your profile details to resend a verification email!",
							button: "Your Profile",
							link: "/profile-organization",
						},
					]}
				/>
			);
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To post a job, please",
							button: "Sign in as Organization",
							link: "/sign-in-organization",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInOrg()}</>;
};
export default PostAJobPage;
