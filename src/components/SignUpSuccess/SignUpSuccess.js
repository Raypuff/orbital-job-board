//IMPORTS
//React Router
import { Link } from "react-router-dom";
//Images
import image from "../../assets/sign-up-success.png";
//CSS Modules
import styles from "./SignUpSuccess.module.css";

const SignUpSuccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className="text-center">Welcome to CCSGP Volunteer Job Board</h2>
        <img className="w-75 mx-auto mb-2" src={image} alt="green checkmark" />
        <p className={styles.paraText}>
          Please check your inbox for an email that contains a link to verify
          your account.
        </p>
        <p className={styles.paraText}>
          If you are new to our platform, do check out the "Getting Started"
          page to familiarize yourself with our features!
        </p>
        <Link to="/">
          <div className={styles.button}>
            <div className={styles.buttonText}>Home</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignUpSuccess;
