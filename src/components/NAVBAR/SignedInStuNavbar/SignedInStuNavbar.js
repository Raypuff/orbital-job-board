import React, { useState, useEffect } from "react";
import {
	NavDropdown,
	Nav,
	Modal,
	Button,
	Pagination,
	Tooltip,
	OverlayTrigger,
	Toast,
	Badge,
} from "react-bootstrap";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./SignedInStuNavbar.module.css";
import stu1 from "../../../assets/gettingStarted/stu1.png";
import stu2 from "../../../assets/gettingStarted/stu2.png";
import stu3 from "../../../assets/gettingStarted/stu3.png";
import stu4 from "../../../assets/gettingStarted/stu4.png";
import {
	InfoLg,
	PersonFill,
	BriefcaseFill,
	ChatSquareDotsFill,
	DoorOpenFill,
	BellFill,
} from "react-bootstrap-icons";
import ReactTimeAgo from "react-time-ago";

const SignedInStuNavbar = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const [showGettingStarted, setShowGettingStarted] = useState(false);
	const [showSignOut, setShowSignOut] = useState(false);
	const history = useHistory();
	const { width } = useWindowDimensions();
	const [notifications, setNotifications] = useState();
	const [notifLoading, setNotifLoading] = useState(true);

	const getNotifications = async () => {
		try {
			const notifData = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/notifications/${currentUser.email}`
			);
			const notifs = await notifData.json();
			setNotifications(notifs);
		} catch (err) {
			console.log(err);
		}
		setNotifLoading(false);
	};

	useEffect(() => {
		getNotifications();
	});

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

	async function dismissAllNotifs() {
		try {
			await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/notifications/dismissAll/${currentUser.email}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: null,
				}
			);
		} catch (err) {
			console.log(err);
		}
	}

	async function dismissNotif(notifId) {
		try {
			await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/notifications/dismiss/${notifId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: null,
				}
			);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Nav>
				<OverlayTrigger
					placement="bottom"
					overlay={renderGettingStartedTooltip}
				>
					<Nav.Link onClick={() => setShowGettingStarted(true)}>
						<InfoLg style={{ marginBottom: "0.3rem" }} />
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>Getting Started</span>
						)}
					</Nav.Link>
				</OverlayTrigger>
			</Nav>
			<Nav>
				<NavDropdown
					title={
						<OverlayTrigger
							placement="bottom"
							overlay={renderNotificationsTooltip}
						>
							<span>
								{width >= 576 && notifications && notifications.length > 0 && (
									<span className={styles.badge}>
										<Badge
											variant="danger"
											style={{ borderRadius: "100%", fontSize: "0.55rem" }}
										>
											{notifications.length}
										</Badge>
									</span>
								)}
								<BellFill
									style={{
										fontSize: "1.2rem",
										marginBottom: "0.2rem",
									}}
								/>
								{width < 576 && (
									<span style={{ marginLeft: "0.4rem" }}>Notifications</span>
								)}
								{width && notifications && notifications.length > 0 && (
									<span className={styles.mobileBadge}>
										<Badge
											variant="danger"
											style={{
												borderRadius: "100%",
												fontSize: "0.55rem",
											}}
										>
											{notifications.length}
										</Badge>
									</span>
								)}
							</span>
						</OverlayTrigger>
					}
					id="collasible-nav-dropdown"
					alignRight
				>
					{notifications && notifications.length > 0 ? (
						<>
							<NavDropdown.Header
								className={styles.clearNotifs}
								onClick={() => {
									dismissAllNotifs();
									setNotifications([]);
								}}
							>
								Clear all notifications
							</NavDropdown.Header>
							{notifications.map((notif) => {
								return (
									<Toast
										style={{
											minWidth: "20rem",
											marginBottom: "0.25rem",
										}}
										onClose={() => {
											dismissNotif(notif.id);
										}}
									>
										<Toast.Header>
											<strong className="mr-auto">{notif.header}</strong>
											<small>
												<ReactTimeAgo
													date={new Date(notif.dateTime)}
													locale="en-GB"
												/>
											</small>
										</Toast.Header>
										<Toast.Body>{notif.message}</Toast.Body>
									</Toast>
								);
							})}
						</>
					) : (
						<NavDropdown.Header
							style={{
								display: "flex",
								justifyContent: "center",
								minWidth: "20rem",
							}}
						>
							You have no notifications
						</NavDropdown.Header>
					)}
				</NavDropdown>
			</Nav>
			<Nav>
				<OverlayTrigger placement="bottom" overlay={renderChatTooltip}>
					<Nav.Link
						as={NavLink}
						exact
						activeClassName={styles.activeNavLink}
						to="/chat-student"
					>
						<ChatSquareDotsFill
							style={{
								fontSize: "1.1rem",
								marginBottom: "0.2rem",
							}}
						/>
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>Your Chats</span>
						)}
					</Nav.Link>
				</OverlayTrigger>
			</Nav>
			<Nav>
				<OverlayTrigger placement="bottom" overlay={renderProfileTooltip}>
					<Nav.Link
						as={NavLink}
						exact
						to="/profile-student"
						activeClassName={styles.activeNavLink}
					>
						<PersonFill
							style={{
								fontSize: "1.3rem",
								marginBottom: "0.2rem",
							}}
						/>
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>Your Profile</span>
						)}
					</Nav.Link>
				</OverlayTrigger>
			</Nav>
			<Nav>
				<OverlayTrigger placement="bottom" overlay={renderYourAppsTooltip}>
					<Nav.Link
						as={NavLink}
						exact
						activeClassName={styles.activeNavLink}
						to="/your-applications"
					>
						<BriefcaseFill
							style={{
								fontSize: "1.2rem",
								marginBottom: "0.2rem",
							}}
						/>
						{width < 576 && (
							<span style={{ marginLeft: "0.4rem" }}>Your Applications</span>
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

export default SignedInStuNavbar;

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

const renderGettingStartedTooltip = (props) => (
	<Tooltip id="getting-started-tooltip" {...props}>
		Getting Started
	</Tooltip>
);

const renderNotificationsTooltip = (props) => (
	<Tooltip id="notifications-tooltip" {...props}>
		Notifications
	</Tooltip>
);

const renderChatTooltip = (props) => (
	<Tooltip id="chat-tooltip" {...props}>
		Your Chats
	</Tooltip>
);

const renderProfileTooltip = (props) => (
	<Tooltip id="profile-tooltip" {...props}>
		Your Profile
	</Tooltip>
);

const renderYourAppsTooltip = (props) => (
	<Tooltip id="your-applications-tooltip" {...props}>
		Your Applications
	</Tooltip>
);

const renderSignOutTooltip = (props) => (
	<Tooltip id="sign-out-tooltip" {...props}>
		Sign Out
	</Tooltip>
);

const dummyNotifications = [
	{
		id: "123",
		receiverID: "raynerljm@gmail.com",
		header: "New applicant",
		message:
			"You have a new applicant (Loh Jia Ming, Rayner) for your job (Code in the Community Run 2)",
		dateTime: "Thu, 03 Jul 2021 03:52:01 GMT",
		dismissed: false,
	},
	{
		id: "124",
		receiverID: "raynerljm@gmail.com",
		header: "Approved job",
		message: "Your job (Code in the Community Run 3) has been approved",
		dateTime: "Thu, 01 Jul 2021 03:52:01 GMT",
		dismissed: false,
	},
];
