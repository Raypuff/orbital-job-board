//IMPORTS
//React Hooks
import { useState, useEffect } from "react";
//Contexts
import { useAuth } from "../../../contexts/AuthContext";
import { useJob } from "../../../contexts/JobContext";
//Bootstrap
import { Row, Col, Pagination, Alert } from "react-bootstrap";
//Components
import JobBoardFilter from "./JobBoardFilter";
import JobBoardCard from "./JobBoardCard";
import { Loading, Empty, EmptyFilter } from "../../EmptyStates/EmptyStates";
//Beneficiaries and Skills
import { BeneficiaryTags, SkillTags } from "../../../Constants";
//React Router
import { Link } from "react-router-dom";
//Form Validation
import { Formik } from "formik";
//CSS Modules
import styles from "./JobBoard.module.css";

const JobBoard = () => {
	//USESTATES
	//All apporved jobs and filtered jobs
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	//State of filter
	const [filterState, setFilterState] = useState({});
	//Pagination system current page
	const [activePage, setActivePage] = useState(1);
	//Retrieving my coords
	const [myLng, setMyLng] = useState();
	const [myLat, setMyLat] = useState();

	//CUSTOM HOOKS
	//Importing API calls for auth and jobs
	const { currentUser, userType } = useAuth();
	const { getAllApprovedJobs, jobLoading } = useJob();

	//USEEFFECTS
	//Retrieve browser location
	useEffect(() => {
		getLocation();
	}, []);
	//Retrieve all approved jobs
	useEffect(() => {
		getAllApprovedJobs(setJobs);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//Filter jobs
	useEffect(() => {
		filterJobs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterState]);

	//FUNCTIONS FOR RETRIEVING LOCATION
	const getLocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setMyLng(position.coords.longitude);
				setMyLat(position.coords.latitude);
			});
		} else {
			setMyLng(false);
			setMyLat(false);
		}
	};

	//FILTERING JOBS
	const filterJobs = () => {
		var calculatedJobs = [...jobs];
		calculatedJobs.forEach((job) => {
			if (job.platform === "Physical" && !job.multiLocation && myLat && myLng) {
				job.distance = distance(job.lat, job.lng, myLat, myLng);
			} else {
				job.distance = false;
			}
		});

		if (jobs && jobs.length > 0) {
			// filtering
			var benFilter = []; //records the beneficiaries filters in place
			for (var k = 0; k < BeneficiaryTags.length; k++) {
				const benTag = BeneficiaryTags[k];
				if (filterState[benTag]) {
					benFilter.push(benTag);
				}
			}
			var skillFilter = []; //records the skills filters in place
			for (var l = 0; l < SkillTags.length; l++) {
				const skillTag = SkillTags[l];
				if (filterState[skillTag]) {
					skillFilter.push(skillTag);
				}
			}

			var processedJobs = [...calculatedJobs];
			if (filterState.longTerm || filterState.adHoc) {
				processedJobs = processedJobs
					.filter((job) => filterState.longTerm || job.type !== "Long term")
					.filter((job) => filterState.adHoc || job.type !== "Ad hoc");
			}
			if (filterState.physical || filterState.virtual) {
				processedJobs = processedJobs
					.filter((job) => filterState.physical || job.platform !== "Physical")
					.filter((job) => filterState.virtual || job.platform !== "Virtual");
			}
			if (benFilter && benFilter.length > 0) {
				processedJobs = processedJobs.filter((job) => {
					var returnValue = false;
					for (const ben in job.beneficiaries) {
						if (benFilter.includes(job.beneficiaries[ben])) {
							returnValue = true;
						}
					}
					return returnValue;
				});
			}
			if (skillFilter && skillFilter.length > 0) {
				processedJobs = processedJobs.filter((job) => {
					var returnValue = false;
					for (const skill in job.skills) {
						if (skillFilter.includes(job.skills[skill])) {
							returnValue = true;
						}
					}
					return returnValue;
				});
			}
			if (filterState.sort === "mostRecent") {
				processedJobs = processedJobs.sort(
					(job1, job2) => new Date(job2.datePosted) - new Date(job1.datePosted)
				);
			} else if (filterState.sort === "nearestDistance") {
				processedJobs = processedJobs.sort(
					(job1, job2) => job1.distance - job2.distance
				);
			}

			setFilteredJobs(processedJobs);
		} else {
			setFilteredJobs([]);
		}
	};

	//CALCULATING PAGINATION SYSTEM
	const jobsPerPage = 3;
	var numberOfPages = Math.ceil(filteredJobs.length / jobsPerPage);
	let pages = [
		<Pagination.First onClick={() => setActivePage(1)} />,
		<Pagination.Prev
			onClick={() => (activePage > 1 ? setActivePage(activePage - 1) : null)}
		/>,
	];
	for (let number = 1; number <= numberOfPages; number++) {
		pages.push(
			<Pagination.Item
				key={number}
				active={activePage === number}
				onClick={() => setActivePage(number)}
			>
				{number}
			</Pagination.Item>
		);
	}
	pages = pages.concat([
		<Pagination.Next
			onClick={() =>
				activePage < numberOfPages ? setActivePage(activePage + 1) : null
			}
		/>,
		<Pagination.Last onClick={() => setActivePage(numberOfPages)} />,
	]);
	var startIndex = jobsPerPage * (activePage - 1);
	var endIndex;
	if (activePage === numberOfPages) {
		endIndex = filteredJobs.length;
	} else {
		endIndex = jobsPerPage * activePage;
	}

	//INITIAL VALUES FOR FORMIK FOR FILTERSTATE
	var initialValues = {
		sort: "mostRecent",
		longTerm: false,
		adHoc: false,
		physical: false,
		virtual: false,
	};
	for (var i = 0; i < BeneficiaryTags.length; i++) {
		initialValues[BeneficiaryTags[i]] = false;
	}
	for (var j = 0; j < SkillTags.length; j++) {
		initialValues[SkillTags[j]] = false;
	}

	//LOADING
	if (jobLoading) {
		return <Loading>Loading jobs...</Loading>;
	}
	//NO JOBS
	if (jobs.length < 1) {
		return (
			<Empty
				title={"There are no available jobs for viewing..."}
				actions={[
					{
						tip: "If you are an organization, click here to",
						button: "Post a job",
						link: "/post-a-job",
					},
					{
						tip: "If you are an NUS student, you can configure your email notifications about new jobs on",
						button: "Your Profile",
						link: "/profile-student",
					},
				]}
			/>
		);
	}

	getLocation();

	return (
		<div className={styles.container}>
			<Row className={styles.rowContainer}>
				<Col md={4} lg={3} className={styles.firstColContainer}>
					<div className={styles.filterContainer}>
						<Formik initialValues={initialValues}>
							{({ values, handleChange, handleBlur }) => (
								<JobBoardFilter
									values={values}
									handleChange={handleChange}
									handleBlur={handleBlur}
									BeneficiaryTags={BeneficiaryTags}
									SkillTags={SkillTags}
									setFilterState={setFilterState}
								/>
							)}
						</Formik>
					</div>
				</Col>
				<Col md={8} lg={9} className={styles.secondColContainer}>
					{filteredJobs.length >= 1 ? (
						<>
							{filteredJobs.slice(startIndex, endIndex).map((job) => {
								return (
									<JobBoardCard
										key={job.id}
										id={job.id}
										orgID={job.orgID}
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
										distance={job.distance}
									/>
								);
							})}
							<div className={styles.pageRow}>
								<Pagination>{pages}</Pagination>
							</div>
						</>
					) : (
						<EmptyFilter />
					)}
				</Col>
			</Row>
			{currentUser && userType === "student" && (
				<div className={styles.subscriptionAlert}>
					<Alert variant="primary">
						Can't find the volunteer opportunity you want? Manage your
						subscriptions on <Link to="/profile-student">Your Profile</Link> to
						be notified when new jobs that you're interested in get posted!
					</Alert>
				</div>
			)}
		</div>
	);
};

export default JobBoard;

//FUNCTION TO CALCULATE DISTANCE BETWEEN 2 PLACES USING LAT LNG
function distance(lat1, lon1, lat2, lon2) {
	var p = 0.017453292519943295; // Math.PI / 180
	var c = Math.cos;
	var a =
		0.5 -
		c((lat2 - lat1) * p) / 2 +
		(c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

	return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
