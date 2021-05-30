import Header from "../../components/Header";
import MyNavbar from "../../components/MyNavbar";
import Footer from "../../components/Footer";
import JobBoard from "../../components/JobBoard";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./JobBoardPage.module.css";

const JobBoardPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      <div className={styles.contents}>
        <JobBoard />
      </div>
      <Footer />
    </>
  );
};

export default JobBoardPage;
