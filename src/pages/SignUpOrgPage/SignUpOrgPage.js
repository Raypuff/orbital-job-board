import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import { useAuth } from "../../contexts/AuthContext";
import SignUpOrgForm from "../../components/ORG/SignUpOrgForm";
import Footer from "../../components/Footer";
// import styles from "./SignUpOrgPage.module.css";

const SignUpOrgPage = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <SignUpOrgForm />
      <Footer />
    </div>
  );
};

export default SignUpOrgPage;
