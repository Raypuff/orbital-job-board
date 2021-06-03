import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import SignUpStuForm from "../../components/STU/SignUpStuForm";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const SignUpStuPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedUp={currentUser} />
      <SignUpStuForm />
      <Footer />
    </div>
  );
};
export default SignUpStuPage;
