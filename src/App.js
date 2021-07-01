// header, navbar and footer
import Header from "./components/Header";
import MyNavbar from "./components/NAVBAR/MyNavbar";
import Footer from "./components/Footer";
//student pages
import SignInStuPage from "./pages/SignInStuPage";
import SignUpStuPage from "./pages/SignUpStuPage";
import ForgotPasswordStuPage from "./pages/ForgotPasswordStuPage";
import YourProfileStuPage from "./pages/YourProfileStuPage";
import YourApplicationsPage from "./pages/YourApplicationsPage";
//org pages
import SignInOrgPage from "./pages/SignInOrgPage";
import SignUpOrgPage from "./pages/SignUpOrgPage";
import ForgotPasswordOrgPage from "./pages/ForgotPasswordOrgPage";
import YourProfileOrgPage from "./pages/YourProfileOrgPage";
import PostAJobPage from "./pages/PostAJobPage";
import EditJobsPage from "./pages/EditJobsPage";
import YourJobsPage from "./pages/YourJobsPage";
// admin pages
import SignInAdminPage from "./pages/SignInAdminPage";
import AllJobsPage from "./pages/AllJobsPage";
// general pages
import LandingPage from "./pages/LandingPage";
import JobBoardPage from "./pages/JobBoardPage";
import JobDetailsPage from "./pages/JobDetailsPage";
// other imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreProvider } from "./contexts/StoreContext";

function App() {
	return (
		<StoreProvider>
			<AuthProvider>
				<Header />
				<MyNavbar />
				<Switch>
					{/* Student Pages */}
					<Route path="/sign-in-student">
						<SignInStuPage />
					</Route>
					<Route path="/sign-up-student">
						<SignUpStuPage />
					</Route>
					<Route path="/forgot-password-student">
						<ForgotPasswordStuPage />
					</Route>
					<Route path="/profile-student">
						<YourProfileStuPage />
					</Route>
					<Route path="/your-applications">
						<YourApplicationsPage />
					</Route>
					{/* Organization Pages */}
					<Route path="/sign-in-organization">
						<SignInOrgPage />
					</Route>
					<Route path="/sign-up-organization">
						<SignUpOrgPage />
					</Route>
					<Route path="/forgot-password-organization">
						<ForgotPasswordOrgPage />
					</Route>
					<Route path="/profile-organization">
						<YourProfileOrgPage />
					</Route>
					<Route path="/post-a-job">
						<PostAJobPage />
					</Route>
					<Route path="/your-jobs/edit/:id">
						<EditJobsPage />
					</Route>
					<Route path="/your-jobs">
						<YourJobsPage />
					</Route>
					{/* Admin Pages */}
					<Route path="/sign-in-admin">
						<SignInAdminPage />
					</Route>
					<Route path="/all-jobs">
						<AllJobsPage />
					</Route>
					{/* General Pages */}
					<Route path="/jobs/:id">
						<JobDetailsPage />
					</Route>
					<Route path="/jobs">
						<JobBoardPage />
					</Route>
					<Route path="/">
						<LandingPage />
					</Route>
				</Switch>
				<Footer />
			</AuthProvider>
		</StoreProvider>
	);
}

export default App;
