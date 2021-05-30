import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
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
            <Route path="/sign_in">
              <SignInPage />
            </Route>
            <Route path="/register">
              <SignUpPage />
            </Route>
            <Route path="/forgot_password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/job_board">
              <JobBoardPage />
            </Route>
            <Route path="/post_a_job">
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
