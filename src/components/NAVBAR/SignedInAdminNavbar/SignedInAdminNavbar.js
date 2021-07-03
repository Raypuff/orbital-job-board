import React, { useState, useEffect } from "react";
import {
	NavDropdown,
	Nav,
	Tooltip,
	OverlayTrigger,
	Modal,
	Button,
} from "react-bootstrap";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./SignedInAdminNavbar.module.css";
import { PersonFill, BriefcaseFill, DoorOpenFill } from "react-bootstrap-icons";

const SignedInAdminNavbar = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const [showSignOut, setShowSignOut] = useState(false);
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
				<OverlayTrigger placement="bottom" overlay={renderProfileTooltip}>
					<Nav.Link
						as={NavLink}
						exact
						activeClassName={styles.activeNavLink}
						to="/profile-admin"
					>
						<PersonFill
							style={{
								fontSize: "1.3rem",
								marginBottom: "0.2rem",
							}}
						/>
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>Profile</span>
						)}
					</Nav.Link>
				</OverlayTrigger>
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
			<Nav>
				<OverlayTrigger placement="bottom" overlay={renderSignOutTooltip}>
					<Nav.Link onClick={() => setShowSignOut(true)}>
						<DoorOpenFill
							style={{
								fontSize: "1.2rem",
								marginBottom: "0.2rem",
							}}
						/>
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>Sign Out</span>
						)}
					</Nav.Link>
				</OverlayTrigger>
			</Nav>
			<Modal
				show={showSignOut}
				onHide={() => setShowSignOut(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure you want to sign out?</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column justify-content-center align-items-center">
					We hope to see you again soon!
					<Button variant="danger" onClick={handleLogout} className="mt-3">
						Sign out
					</Button>
				</Modal.Body>
			</Modal>
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

const renderSignOutTooltip = (props) => (
	<Tooltip id="sign-out-tooltip" {...props}>
		Sign Out
	</Tooltip>
);
