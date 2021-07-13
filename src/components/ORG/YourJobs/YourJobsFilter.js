//IMPORTS
//React Hooks
import { useState, useEffect } from "react";
//Bootstrap
import { Accordion, Card, Form } from "react-bootstrap";
import { ChevronDown, Sliders } from "react-bootstrap-icons";
//CSS Modules
import styles from "./YourJobsFilter.module.css";

const YourJobsFilter = ({
	values,
	handleChange,
	handleBlur,
	setFilterState,
}) => {
	//USESTATES
	//For animating the chevron depending if the accordion is open
	const [statusOpen, setStatusOpen] = useState(true);
	const [typeOpen, setTypeOpen] = useState(true);
	const [platformOpen, setPlatformOpen] = useState(true);

	//CUSTOM HOOKS
	//Retrieving the dimensions of the window so that filter is closed on mobile and open on desktop default
	const { width } = useWindowDimensions();

	return (
		<Form>
			{setFilterState(values)}
			<Accordion defaultActiveKey={width > 768 ? "1" : "0"}>
				<Card className={styles.container}>
					<Accordion.Toggle
						as={Card.Header}
						eventKey="1"
						className={styles.filterHeaderContainer}
					>
						<div className={styles.filterHeaderWrapper}>
							<Sliders />
							<div>Filter</div>
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<Card.Title>Filter by</Card.Title>
							{/* Status */}
							<Accordion defaultActiveKey="0">
								<Accordion.Toggle
									as={Card.Header}
									eventKey="0"
									className={styles.filterHeader}
									onClick={(event) => setStatusOpen(!statusOpen)}
								>
									Type
									<div className={statusOpen ? styles.chevUp : styles.chevDown}>
										<ChevronDown />
									</div>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Form.Group
											controlId="formPending"
											className={styles.input}
										>
											<Form.Check
												name="pending"
												label="Pending"
												checked={values.pending}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
										<Form.Group
											controlId="formApproved"
											className={styles.input}
										>
											<Form.Check
												name="approved"
												label="Approved"
												checked={values.approved}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
										<Form.Group
											controlId="formCompleted"
											className={styles.input}
										>
											<Form.Check
												name="completed"
												label="Completed"
												checked={values.completed}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
										<Form.Group
											controlId="formRejected"
											className={styles.input}
										>
											<Form.Check
												name="rejected"
												label="Rejected"
												checked={values.rejected}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
										<Form.Group
											controlId="formTakenDown"
											className={styles.input}
										>
											<Form.Check
												name="takenDown"
												label="Taken down"
												checked={values.takenDown}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Card.Body>
								</Accordion.Collapse>
							</Accordion>

							{/* Type */}
							<Accordion defaultActiveKey="0">
								<Accordion.Toggle
									as={Card.Header}
									eventKey="0"
									className={styles.filterHeader}
									onClick={(event) => setTypeOpen(!typeOpen)}
								>
									Type
									<div className={typeOpen ? styles.chevUp : styles.chevDown}>
										<ChevronDown />
									</div>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Form.Group
											controlId="formLongTerm"
											className={styles.input}
										>
											<Form.Check
												name="longTerm"
												label="Long term"
												checked={values.longTerm}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
										<Form.Group controlId="formAdHoc" className={styles.input}>
											<Form.Check
												name="adHoc"
												label="Ad hoc"
												checked={values.adHoc}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Card.Body>
								</Accordion.Collapse>
							</Accordion>
							{/* Platform */}
							<Accordion defaultActiveKey="0">
								<Accordion.Toggle
									as={Card.Header}
									eventKey="0"
									className={styles.filterHeader}
									onClick={(event) => setPlatformOpen(!platformOpen)}
								>
									Platform
									<div
										className={platformOpen ? styles.chevUp : styles.chevDown}
									>
										<ChevronDown />
									</div>
								</Accordion.Toggle>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Form.Group
											controlId="formPhysical"
											className={styles.input}
										>
											<Form.Check
												name="physical"
												label="Physical"
												checked={values.physical}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
										<Form.Group
											controlId="formVirtual"
											className={styles.input}
										>
											<Form.Check
												name="virtual"
												label="Virtual"
												checked={values.virtual}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
										</Form.Group>
									</Card.Body>
								</Accordion.Collapse>
							</Accordion>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</Form>
	);
};

export default YourJobsFilter;

//TO RETRIEVE WINDOW DIMENSIONS
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}
