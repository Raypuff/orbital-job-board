import LandingPage from "./pages/LandingPage";
import SignInOrgPage from "./pages/SignInOrgPage";
import SignUpOrgPage from "./pages/SignUpOrgPage";
import ForgotPasswordOrgPage from "./pages/ForgotPasswordOrgPage";
import YourProfileOrgPage from "./pages/YourProfileOrgPage";
import SignInAdminPage from "./pages/SignInAdminPage";
import SignInStuPage from "./pages/SignInStuPage";
import SignUpStuPage from "./pages/SignUpStuPage";
import JobBoardPage from "./pages/JobBoardPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import PostAJobPage from "./pages/PostAJobPage";
import YourJobsPage from "./pages/YourJobsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreProvider } from "./contexts/StoreContext";

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <Router>
          <Switch>
            {/* Admin Pages */}
            <Route path="/sign-in-admin">
              <SignInAdminPage />
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
            <Route path="/your-jobs">
              <YourJobsPage />
            </Route>
            {/* Student Pages */}
            <Route path="/sign-in-student">
              <SignInStuPage />
            </Route>
            <Route path="/sign-up-student">
              <SignUpStuPage />
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
        </Router>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
