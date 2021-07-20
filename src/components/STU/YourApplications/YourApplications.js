//IMPORTS
//React Hooks
import { useEffect, useState } from "react";
//Bootstrap
import { Row, Col } from "react-bootstrap";
//Components
import YourApplicationsCard from "./YourApplicationsCard";
import YourApplicationsFilter from "./YourApplicationsFilter";
import { Loading, Empty, EmptyFilter } from "../../EmptyStates/EmptyStates";
//Handling Form Inputs
import { Formik } from "formik";
//Contexts
import { useAuth } from "../../../contexts/AuthContext";
import { useStu } from "../../../contexts/StuContext";
//CSS Modules
import styles from "./YourApplications.module.css";

const YourApplications = () => {
  //USESTATES
  //Application data
  const [apps, setApps] = useState([]);
  //State of the filter
  const [filterState, setFilterState] = useState({});
  const [appLoading, setAppLoading] = useState(true);

  //CUSTOM HOOKS
  //Current user data
  const { currentUser } = useAuth();
  //Import functions from job context to make API Calls to fetch jobs
  const { getYourApps } = useStu();

  async function getPageData() {
    try {
      const yourApps = await getYourApps(currentUser.email);
      setApps(yourApps);
      setAppLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  //USEEFFECTS
  useEffect(() => {
    getPageData();
  }, []);

  //LOADING
  if (appLoading) {
    return <Loading>Loading your applications...</Loading>;
  }
  //NO JOBS
  if (apps.length < 1) {
    return (
      <Empty
        title={"You do not have any applications available for viewing..."}
        actions={[
          {
            tip: "Ready to get involved and make a difference?",
            button: "Volunteer now",
            link: "/jobs",
          },
        ]}
      />
    );
  }

  //FUNCTIONS
  //Filtering applications based on filterState
  var filteredApplications = apps;
  if (filterState.pending || filterState.accepted || filterState.rejected) {
    filteredApplications = filteredApplications
      .filter((application) =>
        !filterState.pending ? application.status !== "Pending" : true
      )
      .filter((application) =>
        !filterState.accepted ? application.status !== "Accepted" : true
      )
      .filter((application) =>
        !filterState.rejected ? application.status !== "Rejected" : true
      );
  }
  filteredApplications = filteredApplications
    .sort(
      //Sort by recent applications first
      (app1, app2) => new Date(app2.dateApplied) - new Date(app1.dateApplied)
    )
    .sort((app1, app2) => {
      //Sort by pending first
      var app1State = app1.status === "Pending" ? 1 : 0;
      var app2State = app2.status === "Pending" ? 1 : 0;
      return app2State - app1State;
    });

  return (
    <div className={styles.container}>
      <Row className={styles.rowContainer}>
        <Col md={3} className={styles.firstColContainer}>
          <div className={styles.filterContainer}>
            <Formik
              initialValues={{
                pending: false,
                accepted: false,
                rejected: false,
              }}
            >
              {({ values, handleChange, handleBlur }) => (
                <YourApplicationsFilter
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFilterState={setFilterState}
                />
              )}
            </Formik>
          </div>
        </Col>
        <Col md={9} className={styles.secondColContainer}>
          {filteredApplications.length >= 1 ? (
            filteredApplications.map((application) => (
              <YourApplicationsCard
                key={application.id}
                id={application.id}
                stuID={application.stuID}
                jobID={application.jobID}
                status={application.status}
                stuAddInfo={application.stuAddInfo}
                dateApplied={application.dateApplied}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <EmptyFilter />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default YourApplications;
