import YourProfileAdmin from "../../components/ADMIN/YourProfileAdmin";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const YourProfileAdminPage = () => {
  const { currentUser, userType } = useAuth();

  function isSignedInAdmin() {
    if (currentUser !== null && userType === "admin") {
      return <YourProfileAdmin />;
    } else {
      return (
        <Empty
          action={[
            {
              tip: "To view your admin profile details, please",
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
export default YourProfileAdminPage;
