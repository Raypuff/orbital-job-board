import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import Footer from "../../components/Footer";
import PostAJob from "../../components/PostAJob";
import { useAuth } from "../../contexts/AuthContext";

const PostAJobPage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <MyNavbar isLoggedIn={currentUser} />
      <PostAJob />
      <Footer />
    </>
  );
};
export default PostAJobPage;
