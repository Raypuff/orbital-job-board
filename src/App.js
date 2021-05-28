import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
      <Switch>
        <Route path="/sign_in">
          <SignInPage />
        </Route>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/register">
          <SignUpPage />
        </Route>
      </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
