import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Footer from "../../components/Footer";
import PostAJob from "../../components/ORG/PostAJob";
// import PostAJobTest from "../../components/ORG/PostAJob/PostAJobTest";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import styles from "./PostAJobPage.module.css";

const PostAJobPage = () => {
  const { currentUser } = useAuth();

  function canPostJob() {
    if (currentUser !== null) {
      return <PostAJob />;
    } else {
      return (
        <div className={styles.signedOut}>
          <p>
            Please{" "}
            <Link to="/sign-in-organization">sign in as organization</Link> to
            post a job!
          </p>
        </div>
      );
    }
  }

  return (
    <>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      {canPostJob()}
      <Footer />
    </>
  );
};
export default PostAJobPage;
