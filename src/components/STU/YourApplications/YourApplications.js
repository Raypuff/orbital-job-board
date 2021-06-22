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

const YourApplications = () => {
	const [filterState, setFilterState] = useState({});
	const { currentUser } = useAuth();

	const [apps, setApps] = useState({});
	const [appLoading, setAppLoading] = useState(true);

	const getYourApps = async () => {
		const response = await fetch(
			"https://volunteer-ccsgp-backend.herokuapp.com/job_applications/byStudent/" +
				currentUser.email
		);
		const jsonData = await response.json();
		setApps(jsonData);
		setAppLoading(false);
	};

	useEffect(() => {
		getYourApps();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (appLoading) {
		return <LoadingApplications />;
	} else if (apps.length < 1) {
		return <NoApplications />;
	}

	console.log(apps);

	//filter
	const filteredApplications = apps.filter
		? apps
				.filter((application) =>
					!filterState.pending ? application.status !== "Pending" : true
				)
				.filter((application) =>
					!filterState.accepted ? application.status !== "Accepted" : true
				)
				.filter((application) =>
					!filterState.rejected ? application.status !== "Rejected" : true
				)
		: [];

	console.log(filterState);
	// for formik
	var initialValues = {
		pending: true,
		accepted: true,
		rejected: true,
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
