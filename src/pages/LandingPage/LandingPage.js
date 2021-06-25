import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Landing from "../../components/Landing";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const LandingPage = () => {
  const { currentUser } = useAuth();

  console.log("Test env");
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);

  return (
    <>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <Landing />
      <Footer />
    </>
  );
};

export default LandingPage;
