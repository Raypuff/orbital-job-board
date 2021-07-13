import ManageAdmins from "../../components/ADMIN/ManageAdmins";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const ManageAdminsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <ManageAdmins />;
		} else {
			return (
				<Empty
					actions={[
						{
							tip: "To manage admins, please",
							button: "Sign in as Administrator",
							link: "/sign-in-admin",
						},
					]}
				/>
			);
		}
	}

	return <>{isSignedInAdmin()}</>;
};
export default ManageAdminsPage;
