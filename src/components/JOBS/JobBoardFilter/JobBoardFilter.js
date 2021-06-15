import { useState, useEffect } from "react";
import { Accordion, Card, Dropdown, Form } from "react-bootstrap";
import { ChevronDown, Sliders } from "react-bootstrap-icons";
import styles from "./JobBoardFilter.module.css";

const JobBoardFilter = ({
  values,
  handleChange,
  handleBlur,
  BeneficiaryTags,
  SkillTags,
}) => {
  const [typeOpen, setTypeOpen] = useState(true);
  const [platformOpen, setPlatformOpen] = useState(true);
  const [beneficiariesOpen, setBeneficiariesOpen] = useState(true);
  const [skillsOpen, setSkillsOpen] = useState(true);
  const { height, width } = useWindowDimensions();

  return (
    <Form>
      {console.log(values)}
      {console.log(height, width)}
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
              <Card.Title>Sort by</Card.Title>
              <Form.Group controlId="formSortBy">
                <Form.Check
                  type="radio"
                  label="Most recent"
                  name="sort"
                  value="mostRecent"
                  checked={values.sort === "mostRecent"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.input}
                />
                <Form.Check
                  type="radio"
                  label="Nearest distance"
                  name="sort"
                  value="nearestDistance"
                  checked={values.sort === "nearestDistance"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.input}
                />
              </Form.Group>
              <Dropdown.Divider />
              <Card.Title>Filter by</Card.Title>
              {/* Type */}
              <Accordion defaultActiveKey="0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className={styles.filterHeader}
                  onClick={(event) => setTypeOpen(!typeOpen)}
                >
                  Type
                  <div className={typeOpen ? styles.chevUp : styles.chevDown}>
                    <ChevronDown />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form.Group controlId="formType">
                      <Form.Check
                        name="longTerm"
                        label="Long term"
                        checked={values.longTerm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.input}
                      />
                      <Form.Check
                        name="adHoc"
                        label="Ad hoc"
                        checked={values.adHoc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.input}
                      />
                    </Form.Group>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
              {/* Platform */}
              <Accordion defaultActiveKey="0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className={styles.filterHeader}
                  onClick={(event) => setPlatformOpen(!platformOpen)}
                >
                  Platform
                  <div
                    className={platformOpen ? styles.chevUp : styles.chevDown}
                  >
                    <ChevronDown />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form.Group controlId="formPlatform">
                      <Form.Check
                        name="physical"
                        label="Physical"
                        checked={values.physical}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.input}
                      />
                      <Form.Check
                        name="virtual"
                        label="Virtual"
                        checked={values.virtual}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={styles.input}
                      />
                    </Form.Group>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
              {/* Beneficiaries */}
              <Accordion defaultActiveKey="0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className={styles.filterHeader}
                  onClick={(event) => setBeneficiariesOpen(!beneficiariesOpen)}
                >
                  Beneficiaries
                  <div
                    className={
                      beneficiariesOpen ? styles.chevUp : styles.chevDown
                    }
                  >
                    <ChevronDown />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form.Group controlId="formBeneficiaries">
                      {BeneficiaryTags.map((beneficiary, index) => {
                        return (
                          <Form.Check
                            key={beneficiary}
                            name={beneficiary}
                            label={beneficiary}
                            checked={values[beneficiary]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={styles.input}
                          />
                        );
                      })}
                    </Form.Group>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
              {/* Skills */}
              <Accordion defaultActiveKey="0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className={styles.filterHeader}
                  onClick={(event) => setSkillsOpen(!skillsOpen)}
                >
                  Skills
                  <div className={skillsOpen ? styles.chevUp : styles.chevDown}>
                    <ChevronDown />
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Form.Group controlId="formSkills">
                      {SkillTags.map((skill, index) => {
                        return (
                          <Form.Check
                            key={skill}
                            name={skill}
                            label={skill}
                            checked={values[skill]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={styles.input}
                          />
                        );
                      })}
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

export default JobBoardFilter;

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
