import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./Statistics.module.css";
import { useJob } from "../../../contexts/JobContext";
import { useEffect } from "react";
import { CSVLink } from "react-csv";

const Statistics = () => {
  const { getAllJobs, getAllApps } = useJob();
  const [jobs, setJobs] = useState([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [stus, setStus] = useState([]);
  const [stusLoading, setStusLoading] = useState(true);
  const [orgs, setOrgs] = useState([]);
  const [orgsLoading, setOrgsLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);

  useEffect(() => {
    getAllJobs(setJobs);
    setJobLoading(false);
    getAllApps(setApps);
    setAppsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getStus = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/student-accounts"
      );
      const jsonData = await response.json();
      setStus(jsonData);
      setStusLoading(false);
    };
    getStus();
  }, []);

  useEffect(() => {
    const getOrgs = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/organization-accounts"
      );
      const jsonData = await response.json();
      setOrgs(jsonData);
      setOrgsLoading(false);
    };
    getOrgs();
  }, []);

  return (
    <div className={styles.container}>
      <Card>
        <Card.Header as="h5">Overall platform statistics</Card.Header>
        <Card.Body>
          <div>
            Number of currently publicly visible jobs:{" "}
            <span className={styles.stat}>
              {jobLoading
                ? "Loading..."
                : jobs.filter((job) => job.status === "Approved").length}
            </span>
          </div>
          <div>
            Total number of jobs created:{" "}
            <span className={styles.stat}>
              {jobLoading ? "Loading..." : jobs.length}
            </span>
          </div>
          <div>
            Total number of students:{" "}
            <span className={styles.stat}>
              {stusLoading ? "Loading..." : Object.keys(stus).length}
            </span>
          </div>
          <div>
            Total number of organizations:{" "}
            <span className={styles.stat}>
              {orgsLoading ? "Loading..." : Object.keys(orgs).length}
            </span>
          </div>
          <div>
            Total number of applications submitted:{" "}
            <span className={styles.stat}>
              {appsLoading ? "Loading..." : apps.length}
            </span>
          </div>
        </Card.Body>
      </Card>
      <Card className="mt-4">
        <Card.Header as="h5">Export statistics</Card.Header>
        <Card.Body>
          <div className={styles.buttonCol}>
            <CSVLink
              data={jobs}
              filename={`CCSGP All Jobs CAA ${new Date()
                .toDateString()
                .slice(4)}.csv`}
            >
              <Button
                variant="primary"
                className={styles.exportButton}
                disabled={jobLoading}
              >
                Export details of all jobs
              </Button>
            </CSVLink>
            <CSVLink
              data={stus}
              filename={`CCSGP All Students CAA ${new Date()
                .toDateString()
                .slice(4)}.csv`}
            >
              <Button
                variant="primary"
                className={styles.exportButton}
                disabled={stusLoading}
              >
                Export details of all students
              </Button>
            </CSVLink>
            <CSVLink
              data={Object.values(orgs)}
              filename={`CCSGP All Organizations CAA ${new Date()
                .toDateString()
                .slice(4)}.csv`}
            >
              <Button
                variant="primary"
                className={styles.exportButton}
                disabled={orgsLoading}
              >
                Export details of all organizations
              </Button>
            </CSVLink>
            <CSVLink
              data={apps}
              filename={`CCSGP All Applications CAA ${new Date()
                .toDateString()
                .slice(4)}.csv`}
            >
              <Button
                variant="primary"
                className={styles.exportButton}
                disabled={appsLoading}
              >
                Export details of all applications
              </Button>
            </CSVLink>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Statistics;
