//IMPORTS
//React Hooks
import { useEffect, useState } from "react";
//Bootstrap
import { Row, Col } from "react-bootstrap";
//Components
import YourJobsCard from "./YourJobsCard";
import YourJobsFilter from "./YourJobsFilter";
import { Loading, Empty, EmptyFilter } from "../../EmptyStates/EmptyStates";
//Form Management
import { Formik } from "formik";
//Contexts
import { useAuth } from "../../../contexts/AuthContext";
import { useJob } from "../../../contexts/JobContext";
//CSS Modules
import styles from "./YourJobs.module.css";

const YourJobs = () => {
	//USESTATES
	//Store jobs
	const [jobs, setJobs] = useState([]);
	//State of the filter to process jobs
	const [filterState, setFilterState] = useState({});
	//CUSTOM HOOKS
	const { currentUser } = useAuth();
	//Retrieve job data
	const { getYourJobs, jobLoading } = useJob();

	//USEEFFECTS
	useEffect(() => {
		getYourJobs(setJobs, currentUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//LOADING
	if (jobLoading) {
		return <Loading>Loading your jobs...</Loading>;
	}
	//NO JOBS
	if (jobs.length === 0) {
		return (
			<Empty
				title={"You do not have any jobs available for viewing..."}
				action={[
					{
						tip: "Ready to recruit volunteers for your CIP?",
						button: "Post A Job",
						link: "/post-a-job",
					},
				]}
			/>
		);
	}

	//FILTER JOBS
	var filteredJobs = jobs;
	if (
		filterState.pending ||
		filterState.approved ||
		filterState.completed ||
		filterState.rejected ||
		filterState.takenDown
	) {
		filteredJobs = filteredJobs
			.filter((job) => (!filterState.pending ? job.status !== "Pending" : true))
			.filter((job) =>
				!filterState.approved ? job.status !== "Approved" : true
			)
			.filter((job) =>
				!filterState.completed ? job.status !== "Completed" : true
			)
			.filter((job) =>
				!filterState.rejected ? job.status !== "Rejected" : true
			)
			.filter((job) =>
				!filterState.takenDown ? job.status !== "TakenDown" : true
			);
	}
	if (filterState.longTerm || filterState.adHoc) {
		filteredJobs = filteredJobs
			.filter((job) =>
				!filterState.longTerm ? job.type !== "Long term" : true
			)
			.filter((job) => (!filterState.adHoc ? job.type !== "Ad hoc" : true));
	}
	if (filterState.physical || filterState.virtual) {
		filteredJobs = filteredJobs
			.filter((job) =>
				!filterState.physical ? job.platform !== "Physical" : true
			)
			.filter((job) =>
				!filterState.virtual ? job.platform !== "Virtual" : true
			);
	}
	filteredJobs = filteredJobs
		.sort(
			//Sort by recent creation first
			(job1, job2) => new Date(job2.dateCreated) - new Date(job1.dateCreated)
		)
		.sort((job1, job2) => {
			//Sort by pending first
			var job1State = job1.status === "Pending" ? 1 : 0;
			var job2State = job2.status === "Pending" ? 1 : 0;
			return job2State - job1State;
		});

	return (
		<div className={styles.container}>
			<Row className={styles.rowContainer}>
				<Col md={3} className={styles.firstColContainer}>
					<div className={styles.filterContainer}>
						<Formik
							initialValues={{
								pending: false,
								approved: false,
								completed: false,
								rejected: false,
								takenDown: false,
								longTerm: false,
								adHoc: false,
								physical: false,
								virtual: false,
							}}
						>
							{({ values, handleChange, handleBlur }) => (
								<YourJobsFilter
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
					{filteredJobs.length >= 1 ? (
						filteredJobs.map((job) => (
							<YourJobsCard
								key={job.id}
								id={job.id}
								status={job.status}
								title={job.title}
								beneficiaries={job.beneficiaries}
								skills={job.skills}
								purpose={job.purpose}
								platform={job.platform}
								multiLocation={job.multiLocation}
								location={job.location}
								postalCode={job.postalCode}
								type={job.type}
								flexiDate={job.flexiDate}
								longStartDate={job.longStartDate}
								longEndDate={job.longEndDate}
								flexiHours={job.flexiHours}
								longHours={job.longHours}
								flexiShifts={job.flexiShifts}
								adShift={job.adShift}
								addInfo={job.addInfo}
								imageUrl={job.imageUrl}
								closingDate={job.closingDate}
								noClosingDate={job.noClosingDate}
								pocName={job.pocName}
								pocNo={job.pocNo}
								pocEmail={job.pocEmail}
								dateCreated={job.dateCreated}
								datePosted={job.datePosted}
								applicants={job.applicants}
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

export default YourJobs;
