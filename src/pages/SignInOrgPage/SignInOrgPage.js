import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import SignInOrgForm from "../../components/ORG/SignInOrgForm";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
// import styles from "./SignInOrgPage.module.css";

const SignInOrgPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      <SignInOrgForm />
      <Footer />
    </div>
  );
};

export default SignInOrgPage;
