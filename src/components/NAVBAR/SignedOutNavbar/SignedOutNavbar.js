import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Tooltip, OverlayTrigger } from "react-bootstrap";
import PostAJobButton from "../PostAJobButton";
import { NavLink, Link, useLocation } from "react-router-dom";
import { BoxArrowInRight, PersonPlusFill } from "react-bootstrap-icons";
import styles from "./SignedOutNavbar.module.css";

const SignedOutNavbar = () => {
	const { width } = useWindowDimensions();
	const { pathname } = useLocation();
	return (
		<>
			<Nav>
				<NavDropdown
					as={NavLink}
					to="/"
					className={styles.dropdown}
					activeClassName={styles.activeNavLink}
					isActive={() =>
						[
							"/sign-in-student",
							"/sign-in-organization",
							"/sign-in-admin",
						].includes(pathname)
					}
					title={
						<OverlayTrigger placement="bottom" overlay={renderSignInTooltip}>
							<span>
								<BoxArrowInRight
									style={{
										fontSize: "1.3rem",
										marginBottom: "0.2rem",
										marginLeft: "-0.1rem",
									}}
								/>
								{width < 768 && (
									<span style={{ marginLeft: "0.4rem" }}>Sign In</span>
								)}
							</span>
						</OverlayTrigger>
					}
					id="collasible-nav-dropdown"
					alignRight
				>
					<NavDropdown.Item>
						<Nav.Link as={Link} to="/sign-in-student">
							Sign in as NUS Student
						</Nav.Link>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Nav>
							<Nav.Link as={Link} to="/sign-in-organization">
								Sign in as Organization
							</Nav.Link>
						</Nav>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Nav>
							<Nav.Link as={Link} to="/sign-in-admin">
								Sign in as Administrator
							</Nav.Link>
						</Nav>
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Nav>
				<NavDropdown
					as={NavLink}
					to="/"
					className={styles.dropdown}
					activeClassName={styles.activeNavLink}
					isActive={() =>
						["/sign-up-student", "/sign-up-organization"].includes(pathname)
					}
					title={
						<OverlayTrigger placement="bottom" overlay={renderSignUpTooltip}>
							<span>
								<PersonPlusFill
									style={{
										fontSize: "1.3rem",
										marginBottom: "0.2rem",
									}}
								/>
								{width < 768 && (
									<span style={{ marginLeft: "0.4rem" }}>Sign Up</span>
								)}
							</span>
						</OverlayTrigger>
					}
					id="collasible-nav-dropdown"
					alignRight
				>
					<NavDropdown.Item>
						<Nav.Link as={Link} to="/sign-up-student">
							Sign up as NUS Student
						</Nav.Link>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Nav>
							<Nav.Link as={Link} to="/sign-up-organization">
								Sign up as Organization
							</Nav.Link>
						</Nav>
					</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<PostAJobButton />
		</>
	);
};

export default SignedOutNavbar;

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

const renderSignInTooltip = (props) => (
	<Tooltip id="sign-in-tooltip" {...props}>
		Sign In
	</Tooltip>
);

const renderSignUpTooltip = (props) => (
	<Tooltip id="sign-up-tooltip" {...props}>
		Sign Up
	</Tooltip>
);
