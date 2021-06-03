import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import ForgotPasswordOrg from "../../components/ORG/ForgotPasswordOrg";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
// import styles from "./ForgotPasswordOrgPage.module.css"

const ForgotPasswordOrgPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <ForgotPasswordOrg />
      <Footer />
    </div>
  );
};

export default ForgotPasswordOrgPage;
