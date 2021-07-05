import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import YourApplicationsCard from "./YourApplicationsCard";
import YourApplicationsFilter from "./YourApplicationsFilter";
import {
    LoadingApplications,
    NoApplications,
    FilterNoApplications,
} from "./EmptyStates";
import styles from "./YourApplications.module.css";
import { Formik } from "formik";
import { useAuth } from "../../../contexts/AuthContext";
import { useJob } from "../../../contexts/JobContext";

const YourApplications = () => {
    const [filterState, setFilterState] = useState({});
    const { currentUser } = useAuth();
    const { getYourApps, jobLoading } = useJob();

    const [apps, setApps] = useState([]);
    const [appLoading, setAppLoading] = useState(true);

    useEffect(() => {
        getYourApps(setApps, currentUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (jobLoading) {
        return <LoadingApplications />;
    } else if (apps.length < 1) {
        return <NoApplications />;
    }

    //filter
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
            //sort by recent applications first
            (app1, app2) =>
                new Date(app2.dateApplied) - new Date(app1.dateApplied)
        )
        .sort((app1, app2) => {
            // sort by pending first
            var app1State = app1.status === "Pending" ? 1 : 0;
            var app2State = app2.status === "Pending" ? 1 : 0;
            return app2State - app1State;
        });

    // for formik
    var initialValues = {
        pending: false,
        accepted: false,
        rejected: false,
    };

    return (
        <div className={styles.container}>
            <Row className={styles.rowContainer}>
                <Col md={3} className={styles.firstColContainer}>
                    <div className={styles.filterContainer}>
                        <Formik initialValues={initialValues}>
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
                            <FilterNoApplications />
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default YourApplications;
