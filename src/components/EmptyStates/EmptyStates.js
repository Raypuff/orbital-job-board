//IMPORTS
//React Router
import { Link } from "react-router-dom";
//Auth context
import { useAuth } from "../../contexts/AuthContext";
//Bootstrap
import { Spinner } from "react-bootstrap";
//Images
import mountains from "../../assets/emptyStates/mountains-dark.png";
//CSS Modules
import styles from "./EmptyStates.module.css";

//Full screen loading spinner
export const Loading = ({ children }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingWrapper}>
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          className={styles.spinner}
        />
        <div className={styles.loadingTitle}>{children}</div>
      </div>
    </div>
  );
};

//Empty state with mountains
export const Empty = ({ title, actions }) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyWrapper}>
        <img
          className={styles.emptyImage}
          src={mountains}
          alt="No jobs mountains"
        />
        {title && <div className={styles.emptyTitle}>{title}</div>}
        {actions &&
          actions.map((act) => (
            <>
              <div className={styles.emptyAction} key={act.tip}>
                {act.tip}
              </div>
              <Link to={act.link} className={styles.emptyButton}>
                <div className={styles.emptyButtonText}>{act.button}</div>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

//Empty states for no items when filtered
export const EmptyFilter = (props) => {
  const { currentUser, userType } = useAuth();
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <img
          src={mountains}
          alt="Filter no jobs mountains"
          className={styles.filterImage}
        />
        <div className={styles.filterTitle}>
          Hmm... There are no jobs with the filters you selected. Perhaps try a
          different filter?
        </div>
        {props.jobBoard && currentUser && userType === "student" && (
          <>
            <br />
            <div className={styles.filterTitle}>
              If you would like to subscribe to be updated about new jobs,
              proceed to <Link to="/profile-student">your profile</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

//System message for chats
export const SystemMessage = ({ children }) => {
  return (
    <div className={styles.systemMessageContainer}>
      <div className={styles.systemMessage}>{children}</div>
    </div>
  );
};

//Empty state when signed in and prompts you to sign out
export const SignedIn = ({ children }) => {
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyWrapper}>
        <img
          className={styles.emptyImage}
          src={mountains}
          alt="No jobs mountains"
        />
        <div className={styles.emptyAction}>{children}</div>
        <div onClick={() => handleLogout} className={styles.emptyButton}>
          <div className={styles.emptyButtonText}>Sign out</div>
        </div>
      </div>
    </div>
  );
};
