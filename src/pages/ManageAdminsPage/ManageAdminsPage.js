import ManageAdmins from "../../components/ADMIN/ManageAdmins";
import { useAuth } from "../../contexts/AuthContext";
import { NotAdmin } from "./EmptyStates";

const ManageAdminsPage = () => {
	const { currentUser, userType } = useAuth();

	function isSignedInAdmin() {
		if (currentUser !== null && userType === "admin") {
			return <ManageAdmins />;
		} else {
			return <NotAdmin />;
		}
	}

	return <>{isSignedInAdmin()}</>;
};
export default ManageAdminsPage;
