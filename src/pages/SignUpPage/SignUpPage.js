import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import { useAuth } from "../../contexts/AuthContext";
import SignUpForm from "../../components/SignUpForm";
import Footer from "../../components/Footer";
// import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUpPage;
