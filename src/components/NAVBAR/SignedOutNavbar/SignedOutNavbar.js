import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import PostAJobButton from "../PostAJobButton";
import { NavLink, Link } from "react-router-dom";

// import styles from "./SignedOutNavbar.module.css";

const SignedOutNavbar = () => {
	return (
		<>
			<Nav>
				<NavDropdown title="Sign in" id="collasible-nav-dropdown" alignRight>
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
				<NavDropdown title="Sign up" id="collasible-nav-dropdown" alignRight>
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
