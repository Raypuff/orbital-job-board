import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
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
  );
}

export default App;
