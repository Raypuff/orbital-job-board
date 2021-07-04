import { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import JobBoardFilter from "../JobBoardFilter";
import JobBoardCard from "../JobBoardCard";
import styles from "./JobBoard.module.css";
import { BeneficiaryTags, SkillTags } from "../../../assets/Tags";
import { Formik } from "formik";
import { LoadingJobs, NoJobs, FilterNoJobs } from "./EmptyStates";
// import { useStore } from "../../../contexts/StoreContext";
// import { getDefaultNormalizer } from "@testing-library/dom";

const JobBoard = () => {
	const [filterState, setFilterState] = useState({});
	const [jobs, setJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [jobLoading, setJobLoading] = useState(true);
	const [activePage, setActivePage] = useState(1);
	const [myLng, setMyLng] = useState();
	const [myLat, setMyLat] = useState();

	useEffect(() => {
		getLocation();
	}, []);

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
		console.log(`This is my lat: ${myLat} and this is my lng: ${myLng}`);
	};
	getLocation();

	const getJobs = async () => {
		const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/jobs");
		const jsonData = await response.json();
		setJobs(jsonData.filter((job) => job.status === "Approved"));
		setJobLoading(false);
	};

	const filterJobs = () => {
		if (jobs !== null) {
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

			setFilteredJobs(
				jobs
					.filter((job) => filterState.longTerm || job.type !== "Long term")
					.filter((job) => filterState.adHoc || job.type !== "Ad hoc")
					.filter((job) => filterState.physical || job.platform !== "Physical")
					.filter((job) => filterState.virtual || job.platform !== "Virtual")
					.filter((job) => {
						var returnValue = false;
						for (const ben in job.beneficiaries) {
							if (benFilter.includes(job.beneficiaries[ben])) {
								returnValue = true;
							}
						}
						return returnValue;
					})
					.filter((job) => {
						var returnValue = false;
						for (const skill in job.skills) {
							if (skillFilter.includes(job.skills[skill])) {
								returnValue = true;
							}
						}
						return returnValue;
					})
					.sort(
						//sort by recently posted jobs first
						(job1, job2) => {
							if (filterState.sort === "mostRecent") {
								return new Date(job2.datePosted) - new Date(job1.datePosted);
							} else {
								return 0;
							}
						}
					)
					.sort(
						//sort by nearest distance (not implemented)
						(job1, job2) => {
							if (filterState.sort === "nearestDistance") {
								return -1;
							}
						}
					)
			);
		} else {
			setFilteredJobs([]);
		}
	};

	useEffect(() => {
		getJobs();
	}, []);

	useEffect(() => {
		filterJobs();
	}, [filterState]);

	if (jobLoading) {
		return <LoadingJobs />;
	} else if (jobs.length < 1) {
		return <NoJobs />;
	}

	//processing pages
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

	// For Formik
	var initialValues = {
		sort: "mostRecent",
		longTerm: true,
		adHoc: true,
		physical: true,
		virtual: true,
	};
	for (var i = 0; i < BeneficiaryTags.length; i++) {
		initialValues[BeneficiaryTags[i]] = true;
	}
	for (var j = 0; j < SkillTags.length; j++) {
		initialValues[SkillTags[j]] = true;
	}

	return (
		<div className={styles.container}>
			{console.log(filterState.sort)}
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
										lat={job.lat}
										lng={job.lng}
										myLat={myLat}
										myLng={myLng}
									/>
								);
							})}
							<div className={styles.pageRow}>
								<Pagination>{pages}</Pagination>
							</div>
						</>
					) : (
						<FilterNoJobs />
					)}
				</Col>
			</Row>
		</div>
	);
};

export default JobBoard;

// function getMyLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(success);
//   } else {
//     alert("Geolocation not supported");
//   }
// }

// function success(pos) {
//   var crd = pos.coords;
//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
//   myLat = crd.latitude
//   myLong = crd.longitude
// }
