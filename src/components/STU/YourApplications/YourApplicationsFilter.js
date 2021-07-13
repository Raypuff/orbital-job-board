//IMPORTS
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
import { Accordion, Card, Form } from "react-bootstrap";
import { ChevronDown, Sliders } from "react-bootstrap-icons";
//CSS Modules
import styles from "./YourApplicationsFilter.module.css";

const YourApplicationsFilter = ({
  values,
  handleChange,
  handleBlur,
  setFilterState,
}) => {
  //USESTATES
  //To control the animation of chevrons
  const [statusOpen, setStatusOpen] = useState(true);
  const { width } = useWindowDimensions();

  return (
    <Form>
      {setFilterState(values)}
      <Accordion defaultActiveKey={width > 768 ? "1" : "0"}>
        <Card className={styles.container}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            className={styles.filterHeaderContainer}
          >
            <div className={styles.filterHeaderWrapper}>
              <Sliders />
              <div>Filter</div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Card.Title>Filter by</Card.Title>
              {/* Status */}
              <Accordion defaultActiveKey="0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className={styles.filterHeader}
                  onClick={(event) => setStatusOpen(!statusOpen)}
                >
                  Type
                  <div className={statusOpen ? styles.chevUp : styles.chevDown}>
                    <ChevronDown />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form.Group
                      controlId="formPending"
                      className={styles.input}
                    >
                      <Form.Check
                        name="pending"
                        label="Pending"
                        checked={values.pending}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formAccepted"
                      className={styles.input}
                    >
                      <Form.Check
                        name="accepted"
                        label="Accepted"
                        checked={values.accepted}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    <Form.Group
                      controlId="formRejected"
                      className={styles.input}
                    >
                      <Form.Check
                        name="rejected"
                        label="Rejected"
                        checked={values.rejected}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Form>
  );
};

export default YourApplicationsFilter;

//For retrieving window sizes
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
