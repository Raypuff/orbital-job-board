import LoggedOutNavbar from "../LoggedOutNavbar";
import LoggedInNavbar from "../LoggedInNavbar";

const MyNavbar = ({ isLoggedIn }) => {
  if (isLoggedIn != null) {
    return <LoggedInNavbar />;
  }
  return <LoggedOutNavbar />;
};

export default MyNavbar;
