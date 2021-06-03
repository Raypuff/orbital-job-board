import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import SignInAdminForm from "../../components/ADMIN/SignInAdminForm";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const SignInAdminPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <SignInAdminForm />
      <Footer />
    </div>
  );
};

export default SignInAdminPage;
