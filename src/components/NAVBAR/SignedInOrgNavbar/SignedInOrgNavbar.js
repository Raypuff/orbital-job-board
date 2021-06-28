import React, { useState } from "react";
import { NavDropdown, Nav, Modal, Button, Pagination } from "react-bootstrap";
import PostAJobButton from "../PostAJobButton";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./SignedInOrgNavbar.module.css";
import stu1 from "../../../assets/getting_started/stu1.png";
import stu2 from "../../../assets/getting_started/stu2.png";
import stu3 from "../../../assets/getting_started/stu3.png";
import stu4 from "../../../assets/getting_started/stu4.png";

const SignedInOrgNavbar = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const [showGettingStarted, setShowGettingStarted] = useState(false);
	const history = useHistory();

	// page functionality
	const [activePage, setActivePage] = useState(1);
	const numberOfPages = 5;
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
						<br />
						Account Type: Organization
					</NavDropdown.Header>
					<NavDropdown.Divider />
					<NavDropdown.Item as={Link} to="/profile-organization">
						Your profile
					</NavDropdown.Item>
					<NavDropdown.Item onClick={handleLogout}>Sign out</NavDropdown.Item>
				</NavDropdown>
			</Nav>
			<Nav>
				<Nav.Link as={Link} to="/your-jobs">
					Your Jobs
				</Nav.Link>
			</Nav>
			<PostAJobButton />
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
							<h4>Step 1: Fill in your organization profile</h4>
							<p>Welcome to CCSGP Volunteer job board!</p>
							<p>
								To start off, you can proceed to{" "}
								<Link to="/profile-organization">Your Profile</Link> to fill in
								your organization details and contact person's details.
							</p>
							<img
								className={styles.image}
								src={stu1}
								alt="man sitting on bench using laptop"
							/>
							<p>
								Don't worry, you can always edit your profile details if you
								have to.
							</p>
						</>
					) : activePage === 2 ? (
						<>
							<h4>Step 2: Post a job</h4>
							<p>
								Head over to <Link to="/post-a-job">Post A Job</Link> to begin
								posting a job.
							</p>
							<p>
								"Organization Details" reflects your organization details that
								you filled in Step 1. Check this to make sure everything is
								correct!
							</p>
							<p>
								"Job Details" is where you furnish your job with key details
								such as the title of the volunteer work, purpose of volunteer
								work, target profile of beneficiaries and skills required of
								volunteers. You can also indicate the platform - whether it is
								physical or virtual, and the commitment type - if it is long
								term or ad hoc.
							</p>
							<p>
								"Contact Details" is where you put you indicate the contact
								person's details for this job. If it is the same as the contact
								person indicated on your profile, you can simply check "Retrieve
								contact details from your profile".
							</p>
							<p>
								"Terms and Conditions of Use" indicate the terms of service for
								using our website. Please read through carefully! You can only
								post a job if you agree with them.
							</p>
							<p>After you are done, click "Post job"!</p>
						</>
					) : activePage === 3 ? (
						<>
							<h4>Step 3: Wait for approval</h4>
							<p>
								You have successfully applied for the job! All you have to do
								now is sit and wait for the organization to accept your
								application.{" "}
							</p>
							<img className={styles.image} src={stu2} alt="man using phone " />

							<p>
								Wondering if your job has been approved? You can head over to{" "}
								<Link to="/your-jobs">Your Jobs</Link> to view the status of all
								the jobs you have posted.
							</p>
							<p>
								Meanwhile, you can view how your job page will look like by
								clicking the triple dot on your job and clicking "View listing".
								We also have an email update system where you will be notified
								if there are changes to any of your jobs. Additionally, you can
								check out your notifications for any updates on your jobs as
								well.
							</p>
						</>
					) : activePage === 4 ? (
						<>
							<h4>Step 4: Wait for applicants</h4>
							<p>
								Once your job has been approved, it will be publicly available
								on the job board! Students can now view your volunteer
								opportunity and apply for it.
							</p>
							<img
								className={styles.image}
								src={stu3}
								alt="woman lying down using laptop"
							/>

							<p>
								You can view all your applicants by heading to{" "}
								<Link to="/your-jobs">Your Jobs</Link> and clicking
								"Applicants". You can then to proceed to look through students'
								applications. If you decide that they are a good fit for your
								volunteer job, you can click "Accept", if they are not a good
								fit, you can click "Reject"
							</p>
						</>
					) : activePage === 5 ? (
						<>
							<h4>Step 5: Begin your volunteer job</h4>
							<p>
								Once you have recruited sufficient volunteers for your community
								involvement project, you can head over to
								<Link to="/your-jobs">Your Jobs</Link>, click the triple dot and
								click "Mark as completed". This will change the status of your
								job to "Completed" and remove your job from the job board.
							</p>
							<img className={styles.image} src={stu4} alt="woman jumping" />
							<p>
								You can then click the triple dot again and click "Export
								volunteers". This will retrieve the details of all your
								volunteers and place it in a downloadable spreadsheet - whether
								you want to create an mailing list or a Whatsapp group - it is
								up to you!
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

export default SignedInOrgNavbar;
