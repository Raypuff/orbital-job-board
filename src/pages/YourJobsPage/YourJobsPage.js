import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourJobs from "../../components/ORG/YourJobs";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const YourJobsPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <YourJobs />
      <Footer />
    </div>
  );
};
export default YourJobsPage;
