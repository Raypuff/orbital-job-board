import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
// import Template from "../../components/Template";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const TemplatePage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      {/* <Template /> */}
      <Footer />
    </div>
  );
};
export default TemplatePage;
