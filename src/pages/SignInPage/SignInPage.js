import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
// import styles from "./SignInPage.module.css";

const SignInPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default SignInPage;
