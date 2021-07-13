//IMPORTS
//CCSGP Details Constants
import { CCSGP } from "../../Constants";
//Icons
import address from "../../assets/nusFooter/location-arrow-solid.svg";
import phone from "../../assets/nusFooter/phone-alt-solid.svg";
import email from "../../assets/nusFooter/envelope-solid.svg";
import gps from "../../assets/nusFooter/gps.png";
import blank from "../../assets/nusFooter/blank.svg";
//CSS Modules
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.linkBack}>
        <div className={styles.addContainer}>
          <h4 className={styles.footerh4}>
            Centre for Computing for
            <br />
            Social Good and Philanthropy
          </h4>
          <ul>
            <li>
              <img className={styles.addSvg} src={address} alt="address svg" />
              {CCSGP.block}
              <br />
              <img className={styles.addSvg2} src={blank} alt="blank" />
              {CCSGP.street}
              <br />
              <img className={styles.addSvg2} src={blank} alt="blank" />
              Singapore {CCSGP.postalCode}
            </li>
            <li>
              <img className={styles.addSvg} src={phone} alt="phone svg" />
              +65 {CCSGP.phone}
            </li>
            <li>
              <img className={styles.addSvg} src={email} alt="email svg" />
              <a href={`mailto:${CCSGP.email}`}>Email Us</a>
            </li>
            <br />
            <li>
              <img className={styles.gpsSvg} src={gps} alt="gps svg" />
              <a
                target="_blank"
                rel="noreferrer"
                href={CCSGP.googleMapsDirection}
              >
                Directions
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.legalBack}>
        <div className={styles.legalBox}>
          <div className={styles.legalText}>
            ©2021 by Centre for Computing for Social Good and Philanthropy. All
            Rights Reserved.
          </div>
          <div>
            <ul className={styles.legalLink}>
              <li>
                <a href={CCSGP.legal} target="_blank" rel="noreferrer">
                  Legal
                </a>
              </li>
              <li>•</li>
              <li>
                <a href={CCSGP.contactUs} target="_blank" rel="noreferrer">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
