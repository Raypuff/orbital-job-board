import { Row, Col, Card } from "react-bootstrap";
// import JobBoardModal from "../JobBoardModal";
import {
	PeopleFill,
	PuzzleFill,
	GeoAltFill,
	GeoFill,
	ClockFill,
	CalendarWeekFill,
	ArrowRight,
} from "react-bootstrap-icons";
import noImage from "../../../assets/noImage.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./JobBoardCard.module.css";

const JobBoardCard = ({
	id,
	orgType,
	orgName,
	orgUen,
	orgEmail,
	status,
	title,
	beneficiaries,
	skills,
	purpose,
	platform,
	multiLocation,
	location,
	postalCode,
	type,
	flexiDate,
	longStartDate,
	longEndDate,
	flexiHours,
	longHours,
	adShift,
	addInfo,
	imageUrl,
	pocName,
	pocNo,
	pocEmail,
}) => {
	const [imageSrc, setImageSrc] = useState(imageUrl);
	//!!!using api to find long lang of postal code (maybe can shift this to postajob so long lang attached to job)

	// const [coord, setCoord] = useState([]);

	// useEffect(() => {
	//   requestCoord();
	// }, [postalCode]);

	// async function requestCoord() {
	//   const res = await fetch(`https://geocode.xyz/${postalCode}?json=1`);
	//   const json = await res.json();
	//   setCoord([json.latt, json.longt]); //doesn't work because they have a limit on requests
	//   console.log(`${location}: ${coord}`);
	// }

	//!!!using browser capability to get long lang of user
	//!!! use openrouteservice to get the MATRIX distance using long lang of both user and location
	return (
		<div className={styles.cardContainer}>
			<Card>
				<Row>
					<Col lg={3} className={styles.colContainer}>
						{/* Image */}
						<div className={styles.imageContainer}>
							<Card.Img
								data-testid="thumbnail"
								src={imageSrc}
								alt="organization"
								onError={() => setImageSrc(noImage)}
								className={styles.image}
								loading="lazy"
							/>
						</div>
					</Col>
					<Col lg={7}>
						<div className={styles.centreColumnWrapper}>
							{/* Title and Organization */}
							<div className={styles.titleWrapper}>
								<div>
									<h4 className={styles.titleContainer}>{title}</h4>
								</div>
								<div>
									<h6 className={styles.orgContainer}>by {orgName}</h6>
								</div>
							</div>
							{/* Beneficiaries */}
							<div className={styles.infoWrapper}>
								<PeopleFill />
								<div
									data-testid="beneficiaries"
									className={styles.infoContainer}
								>
									{beneficiaries
										? beneficiaries.length <= 2
											? beneficiaries.map((beneficiary, index) => {
													if (index + 1 !== beneficiaries.length) {
														return `${beneficiary}, `;
													} else if (index + 1 === beneficiaries.length) {
														return beneficiary;
													}
											  })
											: beneficiaries.map((beneficiary, index) => {
													if (index === 0) {
														return `${beneficiary}, `;
													} else if (index === 1) {
														return beneficiary;
													} else if (index === 2) {
														return (
															<div
																key={index}
																className={styles.extraShiftWrapper}
															>
																<div className={styles.extraShiftContainer}>
																	{`+${
																		beneficiaries.length - 2
																	} other beneficiar${
																		beneficiaries.length - 2 > 1 ? "ies" : "y"
																	}`}
																</div>
															</div>
														);
													}
											  })
										: "No beneficiaries indicated"}
								</div>
							</div>
							{/* Skills */}
							<div className={styles.infoWrapper}>
								<PuzzleFill />
								<div data-testid="skills" className={styles.infoContainer}>
									{skills
										? skills.length <= 2
											? skills.map((skill, index) => {
													if (index + 1 !== skills.length) {
														return `${skill}, `;
													} else if (index + 1 === skills.length) {
														return skill;
													}
											  })
											: skills.map((skill, index) => {
													if (index === 0) {
														return `${skill}, `;
													} else if (index === 1) {
														return skill;
													} else if (index === 2) {
														return (
															<div
																key={index}
																className={styles.extraShiftWrapper}
															>
																<div className={styles.extraShiftContainer}>
																	{`+${skills.length - 2} other skill${
																		skills.length - 2 > 1 ? "s" : ""
																	}`}
																</div>
															</div>
														);
													}
											  })
										: "No skills indicated"}
								</div>
							</div>
							{/* Location */}
							<div className={styles.higherInfoWrapper}>
								<div className={styles.infoWrapper}>
									<GeoAltFill />
									<div data-testid="location" className={styles.infoContainer}>
										{platform === "Virtual"
											? "Virtual"
											: multiLocation === true
											? "Multiple locations"
											: location}
									</div>
								</div>
								<div className={styles.infoWrapper}>
									<div
										className={
											platform === "Virtual" || multiLocation === true
												? styles.distanceContainerNone
												: styles.distanceContainer
										}
									>
										<GeoFill />
										<div
											data-testid="distance"
											className={styles.infoContainer}
										>{`${postalCode}m away`}</div>
									</div>
								</div>
							</div>
							{/* Long term or Ad hoc*/}
							<div className={styles.infoWrapper}>
								<ClockFill />
								<div data-testid="type" className={styles.infoContainer}>
									{type}
								</div>
							</div>
							{/* Dates*/}
							<div className={styles.higherInfoWrapper}>
								<div className={styles.infoWrapper}>
									<CalendarWeekFill />
									<div data-testid="shifts" className={styles.infoContainer}>
										{type === "Long term"
											? !flexiDate
												? `${new Date(
														longStartDate
												  ).toDateString()} - ${new Date(
														longEndDate
												  ).toDateString()}`
												: "Flexible dates"
											: type === "Ad hoc"
											? adShift && adShift.length > 0
												? `${new Date(
														adShift[0].date
												  ).toDateString()}, ${tConvert(
														adShift[0].startTime
												  )} - ${tConvert(adShift[0].endTime)}`
												: "No shifts indicated"
											: "No volunteer type indicated"}
										{/* Rendering other shifts */}
										<div className={styles.extraShiftWrapper}>
											<div className={styles.extraShiftContainer}>
												{/* Rendering number of other shifts and (s) */}
												{adShift && type === "Ad hoc" && adShift.length > 1
													? `+${adShift.length - 1} other shift${
															adShift.length > 2 ? "s" : ""
													  }`
													: ""}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
					<Col lg={2}>
						{/* Learn More Button */}
						<div className={styles.buttonWrapper}>
							<Link
								to={`/jobs/${id}`}
								target="blank"
								className={styles.buttonContainer}
							>
								<div className={styles.button} variant="primary">
									<h6 className={styles.buttonText}>Learn more</h6>
								</div>
							</Link>
						</div>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default JobBoardCard;

function tConvert(time) {
	// Check correct time format and split into components
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
		time,
	];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(""); // return adjusted time or original string
}
