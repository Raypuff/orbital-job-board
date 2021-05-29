import Header from "../../components/Header";
import LoggedOutNavbar from "../../components/LoggedOutNavbar";
import SignUpForm from "../../components/SignUpForm";
import Footer from "../../components/Footer";
// import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
  return (
    <div>
      <Header />
      <LoggedOutNavbar />
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUpPage;
