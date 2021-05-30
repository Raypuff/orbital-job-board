import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Footer from "../../components/Footer";
import PostAJob from "../../components/PostAJob";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const PostAJobPage = () => {
  const { currentUser } = useAuth();

  function canPostJob() {
    if (currentUser !== null) {
      return <PostAJob />;
    } else {
      return (
        <div>
          Please <Link to="/sign_in">sign in as organization</Link> to post a
          job!
        </div>
      );
    }
  }

  return (
    <>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      {canPostJob()};
      <Footer />
    </>
  );
};
export default PostAJobPage;
