//IMPORTS
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
  ChatSquareDotsFill,
  DoorOpenFill,
  BellFill,
} from "react-bootstrap-icons";
//React Router
import { NavLink, Link, useHistory } from "react-router-dom";
//Images
import stu1 from "../../../assets/gettingStarted/stu1.png";
import stu2 from "../../../assets/gettingStarted/stu2.png";
import stu3 from "../../../assets/gettingStarted/stu3.png";
import stu4 from "../../../assets/gettingStarted/stu4.png";
//ReactTime for Notifications
import ReactTimeAgo from "react-time-ago";
//Auth Contexts
import { useAuth } from "../../../contexts/AuthContext";
import { useNotif } from "../../../contexts/NotifContext";
//CSS Modules
import styles from "./SignedInStuNavbar.module.css";

const SignedInStuNavbar = () => {
  //USESTATES
  //Error message for logging out
  const [error, setError] = useState("");
  //If the getting started modal is showing
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  //If the sign out confirmation modal is showing
  const [showSignOut, setShowSignOut] = useState(false);
  //All notifications
  const [notifications, setNotifications] = useState();
  //If the notifications are loading
  const [notifLoading, setNotifLoading] = useState(true);

  //CUSTOM HOOKS
  //Retrieve account details and logging out
  const { currentUser, logout, token } = useAuth();
  const { dismissNotif, dismissAllNotifs } = useNotif();
  //Push to landing page after logging out
  const history = useHistory();
  //Show icon labels if in mobile view
  const { width } = useWindowDimensions();

  //USEEFFECTS
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const notifData = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/notifications/${currentUser.email}`,
          { headers: { authorization: `Bearer ${token}` } }
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
              {notifications
                .sort((notif1, notif2) => {
                  return new Date(notif2.dateTime) - new Date(notif1.dateTime);
                })
                .map((notif) => {
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
              <p>
                If you have any questions for the organizations, simply click on
                the "Chat now" button! It will bring you to your{" "}
                <Link to="/chat-student">Chats</Link> where you can ask
                organizations any questions that you have!
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
            </>
          ) : activePage === 5 ? (
            <>
              <h4>Step 5: Subscribe to email notifications</h4>
              <p>
                If you don't see any volunteer jobs on the job board that you
                are interested in, don't worry!
              </p>
              <img
                className={styles.image}
                src={stu1}
                alt="man sitting on bench using laptop"
              />
              <p>
                You can proceed to{" "}
                <Link to="/profile-student">Your Profile</Link> where you can
                manage your email subscriptions. Here, you can customize your
                preferences such that you are notified when there are new jobs
                that you may be interested in!
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
      {/* Confirm Sign Out Modal */}
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

//CUSTOM HOOK FOR RETRIEVING WINDOW DIMENSIONS
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
