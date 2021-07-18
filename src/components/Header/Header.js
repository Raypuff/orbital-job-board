//IMPORTS
//React Hooks
import { useState } from "react";
//Bootstrap
import { Modal, Button } from "react-bootstrap";
//CCSGP Details Constants
import { CCSGP } from "../../Constants";
//Logos
import ccsgplogo from "../../assets/headerLogos/ccsgp.png";
import nuslogo from "../../assets/headerLogos/nussoc.png";
//CSS Modules
import styles from "./Header.module.css";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logobox}>
          <div
            className={styles.headerLink}
            onClick={() => {
              setSelectedLink(CCSGP.nusWebsite);
              setShowModal(true);
            }}
          >
            <img
              className={styles.nusLogo}
              src={nuslogo}
              title="NUS Computing"
              alt="NUS Computing Logo"
            />
          </div>
          <div
            onClick={() => {
              setSelectedLink(CCSGP.website);
              setShowModal(true);
            }}
            className={styles.rightLogo}
          >
            <img
              className={styles.ccsgpLogo}
              src={ccsgplogo}
              title="CCSGP"
              alt="CCSGP Logo"
            />
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>You are exiting CCSGP Volunteer Job Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modalBody}>
            You are being redirect to an external page ({selectedLink}), are you
            sure you want to proceed?
            <a
              href={selectedLink}
              rel="noreferrer"
              target="_blank"
              onClick={() => setShowModal(false)}
            >
              <Button variant="primary">Proceed</Button>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
