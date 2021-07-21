import YourJobs from "../../components/ORG/YourJobs";
import { useAuth } from "../../contexts/AuthContext";
import { Empty } from "../../components/EmptyStates/EmptyStates";

const YourJobsPage = () => {
  const { currentUser, userType } = useAuth();

  function isSignedInOrg() {
    if (currentUser !== null && userType === "organization") {
      return <YourJobs />;
    } else {
      return (
        <Empty
          actions={[
            {
              tip: "To view your posted organization jobs, please",
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
export default YourJobsPage;
