import Header from "../../components/Header";
import MyNavbar from "../../components/NAVBAR/MyNavbar";
import ForgotPasswordStu from "../../components/STU/ForgotPasswordStu";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
// import styles from "./ForgotPasswordStuPage.module.css"

const ForgotPasswordStuPage = () => {
	const { currentUser } = useAuth();

	return (
		<div>
			<Header />
			<MyNavbar isSignedIn={currentUser} />
			<ForgotPasswordStu />
			<Footer />
		</div>
	);
};

export default ForgotPasswordStuPage;
