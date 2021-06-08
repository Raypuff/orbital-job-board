import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import JobDetails from "../../components/JOBS/JobDetails";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { withRouter } from "react-router-dom";

const JobDetailsPage = ({ match }) => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <JobDetails id={match.params.id} />
      <Footer />
    </div>
  );
};

const JobDetailsPageWithRouter = withRouter(JobDetailsPage);
export default JobDetailsPageWithRouter;
