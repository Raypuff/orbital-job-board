//IMPORTS
//CCSGP Details Constants
import { CCSGP } from "../../Constants";
//Logos
import ccsgplogo from "../../assets/headerLogos/ccsgp.png";
import nuslogo from "../../assets/headerLogos/nussoc.png";
//CSS Modules
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logobox}>
        <a href={CCSGP.nusWebsite} target="_blank" rel="noreferrer">
          <img
            className={styles.nusLogo}
            src={nuslogo}
            title="NUS Computing"
            alt="NUS Computing Logo"
          />
        </a>
        <a
          href={CCSGP.website}
          target="_blank"
          rel="noreferrer"
          className={styles.rightLogo}
        >
          <img
            className={styles.ccsgpLogo}
            src={ccsgplogo}
            title="CCSGP"
            alt="CCSGP Logo"
          />
        </a>
      </div>
    </div>
  );
};

export default Header;
