import JobCard from "../JobCard";
import styles from "./JobBoard.module.css";

const jobList = [
  {
    id: 1,
    title: "Python Instructor",
    org_name: "Saturday Kids",
    beneficiary: "Underprivileged Teens",
    duration: "2 months",
    writeup:
      "Code In The Community (CITC) is Singapore’s largest program providing free coding classes to get children from disadvantaged backgrounds interested in coding. Volunteers need to be able to complete certain tasks on Hackerrank to demonstrate proficiency.",
  },
  {
    id: 2,
    title: "IT Educator",
    org_name: "CareCorner Senior Activity Centre",
    beneficiary: "Senior Citizens",
    duration: "4 weeks",
    writeup:
      "We spend time with the senior citizens from the CareCorner Senior Activity Centre to introduce them to the world of IT! Don’t worry, as there will be training and guidance provided for the volunteers",
  },
];

const JobBoard = () => {
  return (
    <div className={styles.jobContainer}>
      {jobList.map((job) => (
        <JobCard
          id={job.id}
          title={job.title}
          org_name={job.org_name}
          beneficiary={job.beneficiary}
          duration={job.duration}
          writeup={job.writeup}
        />
      ))}
    </div>
  );
};

export default JobBoard;
