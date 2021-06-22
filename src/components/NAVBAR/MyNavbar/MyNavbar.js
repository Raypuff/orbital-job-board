import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../SignedOutNavbar";
import SignedInStuNavbar from "../SignedInStuNavbar";
import SignedInOrgNavbar from "../SignedInOrgNavbar";
import SignedInAdminNavbar from "../SignedInAdminNavbar";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./MyNavbar.module.css";
import nusccsgplogo from "../../../assets/nusccsgp.png";

const MyNavbar = ({ isSignedIn }) => {
	const { userType } = useAuth();

	const AccountButtons = ({ isSignedIn }) => {
		if (isSignedIn != null) {
			if (userType === "student") {
				return <SignedInStuNavbar />;
			} else if (userType === "organization") {
				return <SignedInOrgNavbar />;
			} else if (userType === "admin") {
				return <SignedInAdminNavbar />;
			}
		}
		return <SignedOutNavbar />;
	};

	return (
		<div className={styles.navback}>
			<div className={styles.navbar}>
				<Navbar bg="light" variant="light" expand="sm">
					<Navbar.Brand className={styles.desktopDisplayNone}>
						<Link to="/">
							<img
								className={styles.navbarLogo}
								src={nusccsgplogo}
								alt="NUS CCSGP Logo"
							/>
						</Link>
					</Navbar.Brand>
					<Nav className={styles.mobileDisplayNone}>
						<Nav.Link as={Link} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/jobs">
							Job Board
						</Nav.Link>
					</Nav>

					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse className="justify-content-end">
						<Nav className={styles.desktopDisplayNone}>
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/jobs">
								Job Board
							</Nav.Link>
						</Nav>
						<AccountButtons isSignedIn={isSignedIn} />
					</Navbar.Collapse>
				</Navbar>
			</div>
		</div>
	);
};

export default MyNavbar;
