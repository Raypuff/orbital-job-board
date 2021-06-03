import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Landing from "../../components/Landing";
import Footer from "../../components/Footer";
// import styles from "./LandingPage.module.css";
import { useAuth } from "../../contexts/AuthContext";

const LandingPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <Landing />
      <Footer />
    </>
  );
};

export default LandingPage;
