import { Row, Col, Card, Button } from "react-bootstrap";
// import { useState } from "react";
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
  longStartDate,
  longEndDate,
  longHours,
  adShift,
  addInfo,
  imageUrl,
  pocName,
  pocNo,
  pocEmail,
}) => {
  console.log(adShift);
  return (
    <div className={styles.cardContainer}>
      <Card>
        <Row>
          <Col xs={12} md={2} lg={3}>
            {/* Image */}
            <div className={styles.imageContainer}>
              <Card.Img
                className={styles.image}
                src={imageUrl}
                alt="organization image"
              />
            </div>
          </Col>
          <Col md={8} lg={7}>
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
                {beneficiaries.map((beneficiary, index) => {
                  if (index + 1 !== beneficiaries.length) {
                    return (
                      <div
                        key={index}
                        className={styles.infoContainer}
                      >{`${beneficiary},`}</div>
                    );
                  } else {
                    return (
                      <div className={styles.infoContainer}>{beneficiary}</div>
                    );
                  }
                })}
              </div>
              {/* Skills */}
              <div className={styles.infoWrapper}>
                <PuzzleFill />
                {skills.map((skill, index) => {
                  if (index + 1 !== skills.length) {
                    return (
                      <div
                        key={index}
                        className={styles.infoContainer}
                      >{`${skill},`}</div>
                    );
                  } else {
                    return <div className={styles.infoContainer}>{skill}</div>;
                  }
                })}
              </div>
              {/* Location */}
              <div className={styles.higherInfoWrapper}>
                <div className={styles.infoWrapper}>
                  <GeoAltFill />
                  <div className={styles.infoContainer}>
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
                      className={styles.infoContainer}
                    >{`<calculate distance from ${postalCode}>`}</div>
                  </div>
                </div>
              </div>
              {/* Long term or Ad hoc*/}
              <div className={styles.infoWrapper}>
                <ClockFill />
                <div className={styles.infoContainer}>{type}</div>
              </div>
              {/* Dates*/}
              <div className={styles.higherInfoWrapper}>
                <div className={styles.infoWrapper}>
                  <CalendarWeekFill />
                  <div className={styles.infoContainer}>
                    {type === "Long term"
                      ? `${longStartDate.toDateString()} - ${longEndDate.toDateString()}`
                      : `${adShift[0].date.toDateString()} ${tConvert(
                          adShift[0].startTime
                        )} - ${tConvert(adShift[0].endTime)}`}
                  </div>
                </div>
                {/* Rendering other shifts */}
                <div className={styles.extraShiftWrapper}>
                  <div
                    className={
                      type === "Ad hoc"
                        ? adShift !== null
                          ? adShift.length > 1
                            ? styles.extraShiftContainer
                            : styles.extraShiftContainerNone
                          : styles.extraShiftContainerNone
                        : styles.extraShiftContainerNone
                    }
                  >
                    {/* Rendering number of other shifts and (s) */}
                    {`+${
                      type === "Ad hoc"
                        ? adShift !== null
                          ? adShift.length > 1
                            ? adShift.length - 1
                            : ""
                          : ""
                        : ""
                    } other shift${
                      type === "Ad hoc"
                        ? adShift !== null
                          ? adShift.length > 2
                            ? "s"
                            : ""
                          : ""
                        : ""
                    }`}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={2} lg={2}>
            {/* Apply Now Button */}
            <div className={styles.buttonWrapper}>
              <div className={styles.button} variant="primary">
                <h6 className={styles.buttonText}>Learn more</h6>
                <ArrowRight className={styles.buttonArrow} />
              </div>
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
