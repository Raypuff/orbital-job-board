import Header from "../../components/Header";
import LoggedOutNavbar from "../../components/LoggedOutNavbar";
import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
// import styles from "./SignInPage.module.css";

const SignInPage = () => {
  return (
    <div>
      <Header />
      <LoggedOutNavbar />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default SignInPage;
