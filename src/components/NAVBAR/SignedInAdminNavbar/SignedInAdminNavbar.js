import React, { useState, useEffect } from "react";
import { NavDropdown, Nav, Tooltip, OverlayTrigger } from "react-bootstrap";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./SignedInAdminNavbar.module.css";
import { PersonFill, BriefcaseFill } from "react-bootstrap-icons";

const SignedInAdminNavbar = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const { width } = useWindowDimensions();

	async function handleLogout() {
		setError("");

		try {
			await logout();
			history.push("/");
			alert("Signed out successfully");
		} catch {
			setError("Failed to log out");
			console.log(error);
		}
	}

	function isVerified() {
		if (currentUser.emailVerified) {
			return "Verified";
		} else {
			return "Please verify your email";
		}
	}

	return (
		<>
			<Nav>
				<NavDropdown
					title={
						<OverlayTrigger placement="bottom" overlay={renderProfileTooltip}>
							<span>
								<PersonFill
									style={{
										fontSize: "1.3rem",
										marginBottom: "0.2rem",
									}}
								/>
								{width < 576 && (
									<span style={{ marginLeft: "0.4rem" }}>Profile</span>
								)}
							</span>
						</OverlayTrigger>
					}
					id="collasible-nav-dropdown"
					alignRight
				>
					<NavDropdown.Header className={styles.email}>
						{currentUser.email}
						<br />({isVerified()})
						<br />
						<br />
						Account Type: Admin
					</NavDropdown.Header>
					<NavDropdown.Divider />
					{/* <NavDropdown.Item as={Link} to="/profile-admin">
						Your profile
					</NavDropdown.Item> */}
					<NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Nav>
				<OverlayTrigger placement="bottom" overlay={renderAllJobsTooltip}>
					<Nav.Link
						as={NavLink}
						exact
						activeClassName={styles.activeNavLink}
						to="/all-jobs"
					>
						<BriefcaseFill
							style={{
								fontSize: "1.2rem",
								marginBottom: "0.2rem",
							}}
						/>
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>All Jobs</span>
						)}
					</Nav.Link>
				</OverlayTrigger>
			</Nav>
		</>
	);
};

export default SignedInAdminNavbar;

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

const renderProfileTooltip = (props) => (
	<Tooltip id="profile-tooltip" {...props}>
		Profile
	</Tooltip>
);

const renderAllJobsTooltip = (props) => (
	<Tooltip id="your-jobs-tooltip" {...props}>
		All Jobs
	</Tooltip>
);
