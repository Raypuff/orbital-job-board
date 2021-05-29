import Header from "../../components/Header";
import LoggedOutNavbar from "../../components/LoggedOutNavbar";
import LoggedInNavbar from "../../components/LoggedInNavbar";
import Footer from "../../components/Footer";
import JobBoard from "../../components/JobBoard";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./JobBoardPage.module.css";

const JobBoardPage = () => {
  const currentUser = useAuth();

  function NavBarLoggedIn() {
    if (currentUser != null) {
      return <LoggedInNavbar />;
    }
    return <LoggedOutNavbar />;
  }

  return (
    <>
      <Header />
      <NavBarLoggedIn isLoggedIn={currentUser} />
      <div className={styles.contents}>
        <JobBoard />
      </div>
      <Footer />
    </>
  );
};

export default JobBoardPage;
