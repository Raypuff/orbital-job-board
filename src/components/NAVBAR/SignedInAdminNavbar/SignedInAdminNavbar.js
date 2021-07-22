//IMPORT
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
import {
  Nav,
  NavDropdown,
  Tooltip,
  Badge,
  Toast,
  OverlayTrigger,
  Modal,
  Button,
} from "react-bootstrap";
import {
  PersonFill,
  BriefcaseFill,
  DoorOpenFill,
  BellFill,
  ClipboardData,
  GearWideConnected,
} from "react-bootstrap-icons";
//React Router
import { NavLink, useHistory } from "react-router-dom";
//Auth context
import { useAuth } from "../../../contexts/AuthContext";
import { useNotif } from "../../../contexts/NotifContext";
//ReactTime for Notifications
import ReactTimeAgo from "react-time-ago";
//CSS Modules
import styles from "./SignedInAdminNavbar.module.css";

const SignedInAdminNavbar = () => {
  //USESTATES
  const [error, setError] = useState("");
  const [showSignOut, setShowSignOut] = useState(false);
  //All the notifications
  const [notifications, setNotifications] = useState();
  //If the notifications are loading
  const [notifLoading, setNotifLoading] = useState(true);

  //CUSTOM HOOKS
  //Log out import from auth context
  const { currentUser, logout, token } = useAuth();
  const { dismissNotif, dismissAllNotifs } = useNotif();

  //History to push to landing page after signing out
  const history = useHistory();
  //Width to show icon labels in mobile
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

  //FUNCTIONS
  //Handle sign out
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
        <OverlayTrigger placement="bottom" overlay={renderStatisticsTooltip}>
          <Nav.Link
            as={NavLink}
            exact
            activeClassName={styles.activeNavLink}
            to="/statistics"
          >
            <ClipboardData
              style={{
                fontSize: "1.3rem",
                marginBottom: "0.2rem",
              }}
            />
            {width < 576 && (
              <span style={{ marginLeft: "0.4rem" }}>Statistics</span>
            )}
          </Nav.Link>
        </OverlayTrigger>
      </Nav>
      <Nav>
        <OverlayTrigger placement="bottom" overlay={renderManageAdminsTooltip}>
          <Nav.Link
            as={NavLink}
            exact
            activeClassName={styles.activeNavLink}
            to="/manage-admins"
          >
            <GearWideConnected
              style={{
                fontSize: "1.2rem",
                marginBottom: "0.2rem",
              }}
            />
            {width < 576 && (
              <span style={{ marginLeft: "0.4rem" }}>Manage Admins</span>
            )}
          </Nav.Link>
        </OverlayTrigger>
      </Nav>
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
const renderNotificationsTooltip = (props) => (
  <Tooltip id="notifications-tooltip" {...props}>
    Notifications
  </Tooltip>
);

const renderStatisticsTooltip = (props) => (
  <Tooltip id="statistics-tooltip" {...props}>
    Statistics
  </Tooltip>
);

const renderManageAdminsTooltip = (props) => (
  <Tooltip id="manage-admins-tooltip" {...props}>
    Manage Admins
  </Tooltip>
);

const renderProfileTooltip = (props) => (
  <Tooltip id="profile-tooltip" {...props}>
    Your Profile
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
