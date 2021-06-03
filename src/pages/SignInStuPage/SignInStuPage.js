import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import SignInStuForm from "../../components/STU/SignInStuForm";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const SignInStuPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <SignInStuForm />
      <Footer />
    </div>
  );
};
export default SignInStuPage;
