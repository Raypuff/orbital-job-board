import Header from "../../components/Header";
import LoggedOutNavbar from "../../components/NAVBAR/LoggedOutNavbar";
import ForgotPassword from "../../components/ForgotPassword";
import Footer from "../../components/Footer";
// import styles from "./SignInPage.module.css";

const ForgotPasswordPage = () => {
  return (
    <div>
      <Header />
      <LoggedOutNavbar />
      <ForgotPassword />
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
