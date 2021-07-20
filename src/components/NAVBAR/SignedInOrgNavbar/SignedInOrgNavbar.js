//IMPORT
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
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
import {
  InfoLg,
  PersonFill,
  BriefcaseFill,
  BellFill,
  ChatSquareDotsFill,
  DoorOpenFill,
} from "react-bootstrap-icons";
//React Router
import { NavLink, Link, useHistory } from "react-router-dom";
//Components
import PostAJobButton from "../PostAJobButton";
//Images
import stu1 from "../../../assets/gettingStarted/stu1.png";
import stu2 from "../../../assets/gettingStarted/stu2.png";
import stu3 from "../../../assets/gettingStarted/stu3.png";
import stu4 from "../../../assets/gettingStarted/stu4.png";
//Auth Context
import { useAuth } from "../../../contexts/AuthContext";
import { useNotif } from "../../../contexts/NotifContext";
//ReactTime for Notifications
import ReactTimeAgo from "react-time-ago";
//CSS Modules
import styles from "./SignedInOrgNavbar.module.css";

const SignedInOrgNavbar = () => {
  //USESTATES
  //Error message for logging out
  const [error, setError] = useState("");
  //If the getting started modal is showing
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  //If the confirm signout modal is showing
  const [showSignOut, setShowSignOut] = useState(false);
  //All the notifications
  const [notifications, setNotifications] = useState();
  //If the notifications are loading
  const [notifLoading, setNotifLoading] = useState(true);

  //CUSTOM HOOKS
  //Retrieve account details and signing out with auth context
  const { currentUser, logout, token } = useAuth();
  const { dismissNotif, dismissAllNotifs } = useNotif();
  //History to push to landing page after signing out
  const history = useHistory();
  //Show icon labels if in mobile view
  const { width } = useWindowDimensions();

  //USEEFFECTS
  //Retrieving notifications
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const notifData = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/notifications/" +
            currentUser.email,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        const notifs = await notifData.json();
        setNotifications(notifs);
      } catch (err) {
        console.log(err);
      }
      setNotifLoading(false);
    };
    getNotifications();
  });

  //PAGINATION SYSTEM
  const [activePage, setActivePage] = useState(1);
  const numberOfPages = 5;
  let pages = [
    <Pagination.Prev
      key={-1}
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
      key={-2}
      onClick={() =>
        activePage < numberOfPages ? setActivePage(activePage + 1) : null
      }
    />
  );

  //FUNCTIONS
  //Signing out
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
                      {notifications ? notifications.length : ""}
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
                  <>
                    <span style={{ marginLeft: "0.4rem" }}>Notifications</span>
                  </>
                )}
                {width < 576 && notifications && notifications.length > 0 && (
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
          {notifLoading && (
            <NavDropdown.Header className={styles.notifHeader}>
              Loading notifications...
            </NavDropdown.Header>
          )}
          {notifications && notifications.length > 0 ? (
            <>
              <NavDropdown.Header
                className={styles.clearNotifs}
                onClick={() => {
                  dismissAllNotifs(currentUser.email);
                  setNotifications([]);
                }}
              >
                Clear all notifications
              </NavDropdown.Header>
              {notifications.map((notif) => {
                return (
                  <Toast
                    key={notif.id}
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
            <NavDropdown.Header className={styles.notifHeader}>
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
            to="/chat-organization"
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
            to="/profile-organization"
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
        <OverlayTrigger placement="bottom" overlay={renderYourJobsTooltip}>
          <Nav.Link
            as={NavLink}
            exact
            activeClassName={styles.activeNavLink}
            to="/your-jobs"
          >
            <BriefcaseFill
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.2rem",
              }}
            />
            {width < 576 && (
              <span style={{ marginLeft: "0.4rem" }}>Your Jobs</span>
            )}
          </Nav.Link>
        </OverlayTrigger>
      </Nav>
      <PostAJobButton />
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
      {/* Getting Started Modal */}
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
              <p>
                Meanwhile, you can check your{" "}
                <Link to="/chat-organization">Chats</Link> to answer any queries
                that potential volunteers might have for you!
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
      {/* Signing out modal */}
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

export default SignedInOrgNavbar;

//CUSTOM HOOK TO RETRIEVE WINDOW DIMENSIONS
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

//TOOLTIPS
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

const renderYourJobsTooltip = (props) => (
  <Tooltip id="your-jobs-tooltip" {...props}>
    Your Jobs
  </Tooltip>
);

const renderSignOutTooltip = (props) => (
  <Tooltip id="sign-out-tooltip" {...props}>
    Sign Out
  </Tooltip>
);
