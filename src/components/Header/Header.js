import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ccsgplogo from "../../assets/ccsgp.png";
import nuslogo from "../../assets/nussoc.png";

const Header = () => {
  return (
    <header className={styles.headerBar}>
      <Link to="/">
        <img
          className={styles.nusLogo}
          src={nuslogo}
          title="NUS Computing"
          alt="MISSING PNG"
        />
      </Link>
      <img
        className={styles.ccsgpLogo}
        src={ccsgplogo}
        title="CCSGP"
        alt="MISSING PNG"
      />
    </header>
  );
};

export default Header;
