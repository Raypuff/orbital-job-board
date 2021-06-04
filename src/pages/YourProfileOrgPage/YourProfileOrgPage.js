import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import YourProfileOrg from "../../components/ORG/YourProfileOrg";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const YourProfileOrgPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      <YourProfileOrg />
      <Footer />
    </div>
  );
};
export default YourProfileOrgPage;
