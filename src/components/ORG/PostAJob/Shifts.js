import { Row, Col, Form } from "react-bootstrap";
import styles from "./PostAJob.module.css";

const Shifts = ({ handleChange, handleBlur, values, touched, errors }) => {
	return (
		<div
			className={
				values.type === "Ad hoc" && values.flexiShifts !== true
					? styles.typeDisplay
					: styles.typeDisplayNone
			}
		>
			<div
				className={
					values.shiftNumber >= 1 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift1Date">
							<Form.Label>Shift 1 date</Form.Label>
							<Form.Control
								type="date"
								name="shift1Date"
								value={values.shift1Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift1Date && !errors.shift1Date}
								isInvalid={touched.shift1Date && errors.shift1Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift1Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift1Start">
							<Form.Label>Shift 1 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift1Start"
								value={values.shift1Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift1Start && !errors.shift1Start}
								isInvalid={touched.shift1Start && errors.shift1Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift1End">
							<Form.Label>Shift 1 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift1End"
								value={values.shift1End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift1End && !errors.shift1End}
								isInvalid={touched.shift1End && errors.shift1End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 2 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift2Date">
							<Form.Label>Shift 2 date</Form.Label>
							<Form.Control
								type="date"
								name="shift2Date"
								value={values.shift2Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift2Date && !errors.shift2Date}
								isInvalid={touched.shift2Date && errors.shift2Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift2Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift2Start">
							<Form.Label>Shift 2 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift2Start"
								value={values.shift2Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift2Start && !errors.shift2Start}
								isInvalid={touched.shift2Start && errors.shift2Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift2End">
							<Form.Label>Shift 2 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift2End"
								value={values.shift2End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift2End && !errors.shift2End}
								isInvalid={touched.shift2End && errors.shift2End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 3 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift3Date">
							<Form.Label>Shift 3 date</Form.Label>
							<Form.Control
								type="date"
								name="shift3Date"
								value={values.shift3Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift3Date && !errors.shift3Date}
								isInvalid={touched.shift3Date && errors.shift3Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift3Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift3Start">
							<Form.Label>Shift 3 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift3Start"
								value={values.shift3Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift3Start && !errors.shift3Start}
								isInvalid={touched.shift3Start && errors.shift3Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift3End">
							<Form.Label>Shift 3 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift3End"
								value={values.shift3End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift3End && !errors.shift3End}
								isInvalid={touched.shift3End && errors.shift3End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 4 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift4Date">
							<Form.Label>Shift 4 date</Form.Label>
							<Form.Control
								type="date"
								name="shift4Date"
								value={values.shift4Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift4Date && !errors.shift4Date}
								isInvalid={touched.shift4Date && errors.shift4Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift4Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift4Start">
							<Form.Label>Shift 4 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift4Start"
								value={values.shift4Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift4Start && !errors.shift4Start}
								isInvalid={touched.shift4Start && errors.shift4Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift4End">
							<Form.Label>Shift 4 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift4End"
								value={values.shift4End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift4End && !errors.shift4End}
								isInvalid={touched.shift4End && errors.shift4End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 5 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift5Date">
							<Form.Label>Shift 5 date</Form.Label>
							<Form.Control
								type="date"
								name="shift5Date"
								value={values.shift5Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift5Date && !errors.shift5Date}
								isInvalid={touched.shift5Date && errors.shift5Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift5Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift5Start">
							<Form.Label>Shift 5 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift5Start"
								value={values.shift5Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift5Start && !errors.shift5Start}
								isInvalid={touched.shift5Start && errors.shift5Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift5End">
							<Form.Label>Shift 5 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift5End"
								value={values.shift5End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift5End && !errors.shift5End}
								isInvalid={touched.shift5End && errors.shift5End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 6 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift6Date">
							<Form.Label>Shift 6 date</Form.Label>
							<Form.Control
								type="date"
								name="shift6Date"
								value={values.shift6Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift6Date && !errors.shift6Date}
								isInvalid={touched.shift6Date && errors.shift6Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift6Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift6Start">
							<Form.Label>Shift 6 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift6Start"
								value={values.shift6Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift6Start && !errors.shift6Start}
								isInvalid={touched.shift6Start && errors.shift6Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift6End">
							<Form.Label>Shift 6 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift6End"
								value={values.shift6End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift6End && !errors.shift6End}
								isInvalid={touched.shift6End && errors.shift6End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 7 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift7Date">
							<Form.Label>Shift 7 date</Form.Label>
							<Form.Control
								type="date"
								name="shift7Date"
								value={values.shift7Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift7Date && !errors.shift7Date}
								isInvalid={touched.shift7Date && errors.shift7Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift7Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift7Start">
							<Form.Label>Shift 7 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift7Start"
								value={values.shift7Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift7Start && !errors.shift7Start}
								isInvalid={touched.shift7Start && errors.shift7Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift7End">
							<Form.Label>Shift 7 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift7End"
								value={values.shift7End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift7End && !errors.shift7End}
								isInvalid={touched.shift7End && errors.shift7End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 8 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift8Date">
							<Form.Label>Shift 8 date</Form.Label>
							<Form.Control
								type="date"
								name="shift8Date"
								value={values.shift8Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift8Date && !errors.shift8Date}
								isInvalid={touched.shift8Date && errors.shift8Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift8Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift8Start">
							<Form.Label>Shift 8 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift8Start"
								value={values.shift8Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift8Start && !errors.shift8Start}
								isInvalid={touched.shift8Start && errors.shift8Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift8End">
							<Form.Label>Shift 8 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift8End"
								value={values.shift8End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift8End && !errors.shift8End}
								isInvalid={touched.shift8End && errors.shift8End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 9 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift9Date">
							<Form.Label>Shift 9 date</Form.Label>
							<Form.Control
								type="date"
								name="shift9Date"
								value={values.shift9Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift9Date && !errors.shift9Date}
								isInvalid={touched.shift9Date && errors.shift9Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift9Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift9Start">
							<Form.Label>Shift 9 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift9Start"
								value={values.shift9Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift9Start && !errors.shift9Start}
								isInvalid={touched.shift9Start && errors.shift9Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift9End">
							<Form.Label>Shift 9 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift9End"
								value={values.shift9End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift9End && !errors.shift9End}
								isInvalid={touched.shift9End && errors.shift9End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
			<div
				className={
					values.shiftNumber >= 10 ? styles.typeDisplay : styles.typeDisplayNone
				}
			>
				<Row>
					<Col>
						<Form.Group controlId="formShift10Date">
							<Form.Label>Shift 10 date</Form.Label>
							<Form.Control
								type="date"
								name="shift10Date"
								value={values.shift10Date}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift10Date && !errors.shift10Date}
								isInvalid={touched.shift10Date && errors.shift10Date}
								min={new Date().toISOString().substring(0, 10)}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.shift10Date}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift10Start">
							<Form.Label>Shift 10 start time</Form.Label>
							<Form.Control
								type="time"
								name="shift10Start"
								value={values.shift10Start}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift10Start && !errors.shift10Start}
								isInvalid={touched.shift10Start && errors.shift10Start}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formShift10End">
							<Form.Label>Shift 10 end time</Form.Label>
							<Form.Control
								type="time"
								name="shift10End"
								value={values.shift10End}
								onChange={handleChange}
								onBlur={handleBlur}
								isValid={touched.shift10End && !errors.shift10End}
								isInvalid={touched.shift10End && errors.shift10End}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Shifts;
