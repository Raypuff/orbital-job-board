import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ccsgplogo from "../../assets/ccsgp.png";
import nuslogo from "../../assets/nussoc.png";

const Header = () => {
  return (
    <header>
      <div className={styles.logobox}>
        <Link to="/">
          <img src={nuslogo} title="NUS Computing" alt="NUS Computing Logo" />
        </Link>
        <img
          className={styles.rightlogo}
          src={ccsgplogo}
          title="CCSGP"
          alt="CCSGP Logo"
        />
      </div>
    </header>
  );
};

export default Header;
