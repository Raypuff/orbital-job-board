import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
// import <component> from "../../components/<component>";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";

const TemplatePage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <Header />
      <MyNavbar isSignedIn={currentUser} />
      {/* <<component> /> */}
      <Footer />
    </div>
  );
};
export default TemplatePage;
