import LandingPage from "./pages/LandingPage";
import SignInOrgPage from "./pages/SignInOrgPage";
import SignUpOrgPage from "./pages/SignUpOrgPage";
import ForgotPasswordPage from "./pages/ForgotPasswordOrgPage";
import JobBoardPage from "./pages/JobBoardPage";
import PostAJobPage from "./pages/PostAJobPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { StoreProvider } from "./contexts/StoreContext";

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/sign-in-organization">
              <SignInOrgPage />
            </Route>
            <Route path="/sign-up-organization">
              <SignUpOrgPage />
            </Route>
            <Route path="/forgot-password-organization">
              <ForgotPasswordPage />
            </Route>
            <Route path="/job-board">
              <JobBoardPage />
            </Route>
            <Route path="/post-a-job">
              <PostAJobPage />
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
