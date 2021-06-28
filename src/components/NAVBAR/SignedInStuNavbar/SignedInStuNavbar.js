import React, { useState } from "react";
import { NavDropdown, Nav, Modal, Button, Pagination } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./SignedInStuNavbar.module.css";
import stu1 from "../../../assets/getting_started/stu1.png";
import stu2 from "../../../assets/getting_started/stu2.png";
import stu3 from "../../../assets/getting_started/stu3.png";
import stu4 from "../../../assets/getting_started/stu4.png";

const SignedInStuNavbar = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const [showGettingStarted, setShowGettingStarted] = useState(false);
	const history = useHistory();
	//page functionality
	const [activePage, setActivePage] = useState(1);
	const numberOfPages = 4;
	let pages = [
		<Pagination.Prev
			onClick={() => (activePage > 1 ? setActivePage(activePage - 1) : null)}
		/>,
	];
	for (let number = 1; number <= numberOfPages; number++) {
		pages.push(
			<Pagination.Item
				key={number}
				active={activePage === number}
				onClick={() => setActivePage(number)}
			>
				{number}
			</Pagination.Item>
		);
	}
	pages.push(
		<Pagination.Next
			onClick={() =>
				activePage < numberOfPages ? setActivePage(activePage + 1) : null
			}
		/>
	);

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
				<Nav.Link onClick={() => setShowGettingStarted(true)}>
					Getting Started
				</Nav.Link>
			</Nav>
			<Nav>
				<NavDropdown title="Profile" id="collasible-nav-dropdown" alignRight>
					<NavDropdown.Header className={styles.email}>
						{currentUser.email}
						<br />({isVerified()})
						<br />
						<br /> Account Type: Student
					</NavDropdown.Header>
					<NavDropdown.Divider />
					<NavDropdown.Item as={Link} to="/profile-student">
						Your profile
					</NavDropdown.Item>
					<NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Nav>
				<Nav.Link as={Link} to="/your-applications">
					Your Applications
				</Nav.Link>
			</Nav>
			<Modal
				show={showGettingStarted}
				onHide={() => setShowGettingStarted(false)}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Getting Started
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className={styles.modalBody}>
					{activePage === 1 ? (
						<>
							<h4>Step 1: Fill in your profile</h4>
							<p>Welcome to CCSGP Volunteer job board!</p>
							<p>
								To start off, you can proceed to{" "}
								<Link to="/profile-student">Your Profile</Link> to fill in your
								personal details. By doing so, we can help you autofill your
								details when applying for volunteer jobs!
							</p>
							<img
								className={styles.image}
								src={stu1}
								alt="man sitting on bench using laptop"
							/>
							<p>
								Don't worry, you can still apply for jobs without doing this
								step but if you do, you never have to fill in your details when
								applying for another volunteer job!
							</p>
						</>
					) : activePage === 2 ? (
						<>
							<h4>Step 2: Browse volunteer jobs</h4>
							<p>
								Head over to the <Link to="/jobs">Job Board</Link> to begin
								looking through various volunteer opportunities. Using the handy
								filter, you are able to sift through jobs and only view the ones
								that you are interested in!
							</p>
							<img className={styles.image} src={stu2} alt="man using phone " />
							<p>
								Once you have found a job you think you would like to volunteer
								for, click on the "Learn more" button. It brings you to a new
								page where you can look through all the finer details of the
								job.
							</p>
						</>
					) : activePage === 3 ? (
						<>
							<h4>Step 3: Apply for a volunteer job</h4>
							<p>
								Once you have found a job that you would like to volunteer for
								and that you can commit to, scroll down and click on the "Apply
								now" button. This will open a popup for you to fill in an
								application form.
							</p>
							<img
								className={styles.image}
								src={stu3}
								alt="woman lying down using laptop"
							/>
							<p>
								Already filled in your profile details in Step 1? Check the
								"Retrieve details from your profile" option and the form will
								magically be filled in for you! You can also fill in the
								"Additional information" field to inform the organization of any
								relevant skills or concerns you have, though this is optional!
							</p>
							<p>When you are done, click the "Apply now" button!</p>
						</>
					) : activePage === 4 ? (
						<>
							<h4>Step 4: Wait for acceptance</h4>
							<p>
								You have successfully applied for the job! All you have to do
								now is sit and wait for the organization to accept your
								application.
							</p>
							<img className={styles.image} src={stu4} alt="woman jumping" />
							<p>
								Wondering if you have been accepted? You can head over to{" "}
								<Link to="/your-applications">Your Applications</Link> to view
								the status of all the jobs you have applied for. We also have an
								email update system where you will be notified if there are
								changes to any of your applications. Additionally, you can check
								out your notifications for any updates on your applications as
								well.
							</p>
							<Button
								variant="primary"
								onClick={() => setShowGettingStarted(false)}
							>
								Let's go!
							</Button>
						</>
					) : null}
				</Modal.Body>
				<Modal.Footer className={styles.modalFooter}>
					<div className={styles.pagesRow}>
						<Pagination className={styles.pages}>{pages}</Pagination>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SignedInStuNavbar;
