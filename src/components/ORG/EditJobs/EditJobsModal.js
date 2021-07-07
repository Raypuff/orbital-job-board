import { useState } from "react";
import { useDist } from "../../../contexts/DistContext";
import Shifts from "./Shifts";
import { Formik } from "formik";
import * as Yup from "yup";
import { SelectBeneficiaryTags, SelectSkillTags } from "../../../assets/Tags";
import Select from "react-select";
import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import styles from "./EditJobsModal.module.css";

const EditJobsModal = ({
  job,
  setJob,
  tooltipDict,
  editMode,
  show,
  onHide,
}) => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const { getGeocode } = useDist();

  const uploadImage = async (event) => {
    setImageLoading(true);
    try {
      const files = event.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "volunteer-ccsgp-images");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/volunteer-ccsgp-job-board/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImage(file.secure_url);
      setImageUrl(file.secure_url);
    } catch (err) {
      console.log(err);
    }
    setImageLoading(false);
  };

  const mySubmit = (values, { resetForm }) => {
    console.log("submit");
    var editedJob = job;
    if (editMode === "image") {
      editedJob.imageUrl = imageUrl;
    } else if (editMode === "title") {
      editedJob.title = values.title;
    } else if (editMode === "closingDate") {
    } else if (editMode === "beneficiaries") {
    } else if (editMode === "skills") {
    } else if (editMode === "purpose") {
    } else if (editMode === "location") {
    } else if (editMode === "commitment") {
    } else if (editMode === "addInfo") {
    } else if (editMode === "contact") {
    }
    setJob(editedJob);
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Formik
          initialValues={{
            editMode: editMode,
            title: "",
            beneficiaries: "untouched",
            skills: "untouched",
            purpose: "",
            platform: "",
            multiLocation: false,
            location: "",
            postalCode: "",
            type: "",
            flexiDate: false,
            longStartDate: "",
            longEndDate: "",
            flexiHours: false,
            longHours: "",
            flexiShifts: false,
            shiftNumber: 1,
            shift1Date: "",
            shift1Start: "",
            shift1End: "",
            shift2Date: "",
            shift2Start: "",
            shift2End: "",
            shift3Date: "",
            shift3Start: "",
            shift3End: "",
            shift4Date: "",
            shift4Start: "",
            shift4End: "",
            shift5Date: "",
            shift5Start: "",
            shift5End: "",
            shift6Date: "",
            shift6Start: "",
            shift6End: "",
            shift7Date: "",
            shift7Start: "",
            shift7End: "",
            shift8Date: "",
            shift8Start: "",
            shift8End: "",
            shift9Date: "",
            shift9Start: "",
            shift9End: "",
            shift10Date: "",
            shift10Start: "",
            shift10End: "",
            addInfo: "",
            closingDate: "",
            noClosingDate: false,
            pocName: "",
            pocNo: "",
            pocEmail: "",
          }}
          validationSchema={validationSchema}
          onSubmit={mySubmit}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  You are editing {tooltipDict[editMode]}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {editMode === "image" ? (
                  <Form.Group>
                    <Form.Label>
                      Upload image
                      <Form.Text className="text-muted">
                        An image that best captures the essence of the volunteer
                        job would be helpful in attracting more volunteers
                      </Form.Text>
                    </Form.Label>
                    <Form.Control
                      name="file"
                      type="file"
                      onChange={uploadImage}
                      accept="image/*"
                    />
                    <div className={styles.imageContainer}>
                      {imageLoading ? (
                        <Spinner
                          animation="border"
                          role="status"
                          variant="primary"
                        >
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : image ? (
                        <img
                          src={image}
                          className={styles.image}
                          alt="Volunteer"
                        />
                      ) : null}
                    </div>
                  </Form.Group>
                ) : editMode === "title" ? (
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title of volunteer work</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.title && !errors.title}
                      isInvalid={touched.title && errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : editMode === "closingDate" ? (
                  <Form.Group controlId="formClosingDate">
                    <Form.Label>
                      Closing date
                      <Form.Text className="text-muted">
                        Indicating a closing date would give volunteers a better
                        sense of the application timeframe
                      </Form.Text>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="closingDate"
                      value={values.closingDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.closingDate && !errors.closingDate}
                      isInvalid={touched.closingDate && errors.closingDate}
                      min={new Date().toISOString().substring(0, 10)}
                      disabled={values.noClosingDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.closingDate}
                    </Form.Control.Feedback>
                    <Form.Text>
                      <Form>
                        <Form.Group>
                          <Form.Check
                            name="noClosingDate"
                            label="There is no closing date"
                            checked={values.noClosingDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            feedback={errors.noClosingDate}
                          />
                        </Form.Group>
                      </Form>
                    </Form.Text>
                  </Form.Group>
                ) : editMode === "beneficiaries" ? (
                  <Form.Group controlId="formBeneficiary">
                    <Form.Label>Target profile of beneficiary</Form.Label>
                    <Select
                      isMulti
                      name="beneficiaries"
                      options={SelectBeneficiaryTags}
                      onBlur={handleBlur}
                      onChange={(inputValue) => {
                        values.beneficiaries = inputValue.map((e) => e.value);
                      }}
                    />
                    {values.beneficiaries !== "untouched" ? (
                      values.beneficiaries.length === 0 ? (
                        <Form.Text className="text-danger">
                          Please select at least one beneficiary
                        </Form.Text>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    <Form.Text className="text-muted">
                      For 'Other', you can elaborate in the Additional
                      information section
                    </Form.Text>
                  </Form.Group>
                ) : editMode === "skills" ? (
                  <Form.Group controlId="formSkills">
                    <Form.Label>Skills required</Form.Label>
                    <Select
                      isMulti
                      name="skills"
                      options={SelectSkillTags}
                      onBlur={handleBlur}
                      onChange={(inputValue) => {
                        values.skills = inputValue.map((e) => e.value);
                      }}
                    />
                    {values.skills !== "untouched" ? (
                      values.skills.length === 0 ? (
                        <Form.Text className="text-danger">
                          Please select at least one skill
                        </Form.Text>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    <Form.Text className="text-muted">
                      For 'Others', you can elaborate in the Additional
                      information section
                    </Form.Text>
                  </Form.Group>
                ) : editMode === "purpose" ? (
                  <Form.Group controlId="formPurpose">
                    <Form.Label>
                      Purpose of volunteer work
                      <Form.Text className="text-muted">
                        Do explain what volunteers would be doing and why they
                        are doing it. It would also be useful to elaborate how
                        volunteers can benefit from the experience.
                      </Form.Text>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={2}
                      name="purpose"
                      value={values.purpose}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.purpose && !errors.purpose}
                      isInvalid={touched.purpose && errors.purpose}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.purpose}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : editMode === "location" ? (
                  <>
                    <Form.Group controlId="formPlatform">
                      <Form.Label>Platform of volunteer work</Form.Label>
                      <Form.Control
                        name="platform"
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.platform && !errors.platform}
                        isInvalid={touched.platform && errors.platform}
                      >
                        <option value="" disabled selected />
                        <option>Physical</option>
                        <option>Virtual</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.platform}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div
                      className={
                        values.platform !== "Physical"
                          ? styles.typeDisplayNone
                          : styles.typeDisplay
                      }
                    >
                      <Row>
                        <Col md={8}>
                          <Form.Group controlId="formLocation">
                            <Form.Label>Location of volunteer work</Form.Label>

                            <Form.Control
                              type="text"
                              readOnly={
                                values.multiLocation ||
                                values.platform === "Virtual"
                              }
                              name="location"
                              value={values.location}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.location && !errors.location}
                              isInvalid={touched.location && errors.location}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.location}
                            </Form.Control.Feedback>
                            <Form.Text>
                              <Form.Group controlId="formMultiLocation">
                                <Form.Check
                                  name="multiLocation"
                                  label="Multiple locations"
                                  disabled={values.platform === "Virtual"}
                                  checked={
                                    values.platform === "Virtual"
                                      ? false
                                      : values.multiLocation
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  feedback={errors.multiLocation}
                                />
                              </Form.Group>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group controlId="formPostalCode">
                            <Form.Label>Postal code of location</Form.Label>

                            <Form.Control
                              type="text"
                              name="postalCode"
                              value={values.postalCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={
                                values.multiLocation ||
                                values.platform === "Virtual"
                              }
                              isValid={touched.postalCode && !errors.postalCode}
                              isInvalid={
                                touched.postalCode && errors.postalCode
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.postalCode}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                              The postal code will be used to display the
                              distance of the job from volunteers
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : editMode === "commitment" ? (
                  <>
                    <Form.Group controlId="formType">
                      <Form.Label>
                        Type of volunteer commitment level
                      </Form.Label>
                      <Form.Control
                        name="type"
                        as="select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values.type}
                        isValid={touched.type && !errors.type}
                        isInvalid={touched.type && errors.type}
                      >
                        <option value="" disabled selected />
                        <option>Long term</option>
                        <option>Ad hoc</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.type}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* Long term */}
                    <div
                      className={
                        values.type !== "Long term"
                          ? styles.typeDisplayNone
                          : styles.typeDisplay
                      }
                    >
                      <Row>
                        <Col>
                          <Form.Group controlId="formLongStartDate">
                            <Form.Label>
                              Long term - Start date of volunteer work
                            </Form.Label>
                            <Form.Control
                              name="longStartDate"
                              readOnly={
                                values.type !== "Long term" || values.flexiDate
                              }
                              type="date"
                              value={values.longStartDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={
                                touched.longStartDate && !errors.longStartDate
                              }
                              isInvalid={
                                touched.longStartDate && errors.longStartDate
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.longStartDate}
                            </Form.Control.Feedback>
                            <Form.Text>
                              <Form>
                                <Form.Group>
                                  <Form.Check
                                    name="flexiDate"
                                    label="Start and end dates are flexible"
                                    checked={
                                      values.type !== "Long term"
                                        ? false
                                        : values.flexiDate
                                    }
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    feedback={errors.flexiDate}
                                  />
                                </Form.Group>
                              </Form>
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="formLongEndDate">
                            <Form.Label>
                              Long term - End date of volunteer work
                            </Form.Label>
                            <Form.Control
                              name="longEndDate"
                              type="date"
                              readOnly={
                                values.type !== "Long term" || values.flexiDate
                              }
                              value={values.longEndDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={
                                touched.longEndDate && !errors.longEndDate
                              }
                              isInvalid={
                                touched.longEndDate && errors.longEndDate
                              }
                              min={new Date().toISOString().substring(0, 10)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.longEndDate}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="formLongHours">
                        <Form.Label>
                          Long term - Number of hours to commit
                        </Form.Label>
                        <Form.Control
                          name="longHours"
                          readOnly={
                            values.type !== "Long term" || values.flexiHours
                          }
                          value={values.longHours}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.longHours && !errors.longHours}
                          isInvalid={touched.longHours && errors.longHours}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.longHours}
                        </Form.Control.Feedback>
                        <Form.Text>
                          <Form>
                            <Form.Group>
                              <Form.Check
                                name="flexiHours"
                                label="Number of hours to commit is flexible"
                                checked={
                                  values.type !== "Long term"
                                    ? false
                                    : values.flexiHours
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                feedback={errors.flexiHours}
                              />
                            </Form.Group>
                          </Form>
                        </Form.Text>
                      </Form.Group>
                    </div>
                    {/* Ad hoc */}
                    <div
                      className={
                        values.type === "Ad hoc"
                          ? styles.typeDisplay
                          : styles.typeDisplayNone
                      }
                    >
                      <Form.Group controlId="formShiftNumber">
                        <Form.Label>Ad hoc - Number of shifts</Form.Label>
                        <Form.Control
                          name="shiftNumber"
                          disabled={
                            values.type !== "Ad hoc" ||
                            values.flexiShifts === true
                          }
                          placeholder={
                            values.type !== "Ad hoc"
                              ? 0
                              : values.flexiShifts === false
                              ? values.shiftNumber
                              : 0
                          }
                          value={
                            values.type !== "Ad hoc"
                              ? 0
                              : values.flexiShifts === false
                              ? values.shiftNumber
                              : 0
                          }
                          type="number"
                          min="0"
                          max="10"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.shiftNumber && !errors.shiftNumber}
                          isInvalid={touched.shiftNumber && errors.shiftNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.shiftNumber}
                        </Form.Control.Feedback>
                        <Form.Text>
                          <Form.Group controlId="formFlexiShifts">
                            <Form.Check
                              name="flexiShifts"
                              label="Flexible shifts"
                              disabled={values.type === "Long term"}
                              checked={
                                values.type === "Long term"
                                  ? false
                                  : values.flexiShifts
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              feedback={errors.flexiShifts}
                            />
                          </Form.Group>
                        </Form.Text>
                      </Form.Group>
                    </div>

                    <Shifts
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      values={values}
                      touched={touched}
                      errors={errors}
                    />
                  </>
                ) : editMode === "addInfo" ? (
                  <Form.Group controlId="formAddInfo">
                    <Form.Label>
                      Additional information
                      <Form.Text className="text-muted">
                        Here you can indicate any other relevant information
                        that would be good for the volunteers to know
                      </Form.Text>
                    </Form.Label>
                    <Form.Control
                      name="addInfo"
                      type="text"
                      as="textarea"
                      rows={2}
                      value={values.addInfo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.addInfo && !errors.addInfo}
                      isInvalid={touched.addInfo && errors.addInfo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.addInfo}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : editMode === "contact" ? (
                  <>
                    <Form.Group controlId="formPocName">
                      <Form.Label>Name of contact person</Form.Label>
                      <Form.Control
                        name="pocName"
                        type="text"
                        value={values.pocName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.pocName && !errors.pocName}
                        isInvalid={touched.pocName && errors.pocName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pocName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPocNo">
                      <Form.Label>Mobile number of contact person</Form.Label>
                      <Form.Control
                        name="pocNo"
                        type="text"
                        value={values.pocNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.pocNo && !errors.pocNo}
                        isInvalid={touched.pocNo && errors.pocNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pocNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPocEmail">
                      <Form.Label>Email address of contact person</Form.Label>
                      <Form.Control
                        name="pocEmail"
                        type="email"
                        value={values.pocEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.pocEmail && !errors.pocEmail}
                        isInvalid={touched.pocEmail && errors.pocEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pocEmail}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                ) : null}
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Edit</Button>
                <Form.Text className="text-muted">
                  Your changes will not be sent until you click "Confirm
                  changes"
                </Form.Text>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditJobsModal;

function adShiftProcessor(
  shiftNumber,
  shift1Date,
  shift1Start,
  shift1End,
  shift2Date,
  shift2Start,
  shift2End,
  shift3Date,
  shift3Start,
  shift3End,
  shift4Date,
  shift4Start,
  shift4End,
  shift5Date,
  shift5Start,
  shift5End,
  shift6Date,
  shift6Start,
  shift6End,
  shift7Date,
  shift7Start,
  shift7End,
  shift8Date,
  shift8Start,
  shift8End,
  shift9Date,
  shift9Start,
  shift9End,
  shift10Date,
  shift10Start,
  shift10End
) {
  const temp = [
    [shift1Date, shift1Start, shift1End],
    [shift2Date, shift2Start, shift2End],
    [shift3Date, shift3Start, shift3End],
    [shift4Date, shift4Start, shift4End],
    [shift5Date, shift5Start, shift5End],
    [shift6Date, shift6Start, shift6End],
    [shift7Date, shift7Start, shift7End],
    [shift8Date, shift8Start, shift8End],
    [shift9Date, shift9Start, shift9End],
    [shift10Date, shift10Start, shift10End],
  ];

  const returnList = [];
  for (var i = 0; i < shiftNumber; i++) {
    var holder = { date: "", startTime: "", endTime: "" };
    holder.date = temp[i][0];
    holder.startTime = temp[i][1];
    holder.endTime = temp[i][2];
    returnList.push(holder);
  }
  return returnList;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().when("editMode", {
    is: "title",
    then: Yup.string().required("Please indicate the volunteer job title"),
  }),
  purpose: Yup.string().when("editMode", {
    is: "purpose",
    then: Yup.string().required(
      "Please indicate the purpose of the volunteer job"
    ),
  }),
  beneficiaries: Yup.string().when("editMode", {
    is: "beneficiaries",
    then: Yup.array("Please select at least one beneficiary")
      .of(Yup.string())
      .required("Please select at least one beneficiary"),
  }),

  skills: Yup.string().when("editMode", {
    is: "skills",
    then: Yup.array("Please select at least one skill")
      .of(Yup.string())
      .required("Please select at least one skill"),
  }),

  platform: Yup.string().when("editMode", {
    is: "location",
    then: Yup.string().required(
      "Please indicate if the volunteer platform is physical or virtual"
    ),
  }),
  multiLocation: Yup.bool(),
  location: Yup.string().when(["platform", "multiLocation", "editMode"], {
    is: (platform, multiLocation, editMode) =>
      editMode === "location" &&
      platform === "Physical" &&
      multiLocation !== true,
    then: Yup.string().required(
      "Please indicate the location of the volunteer job"
    ),
  }),
  postalCode: Yup.string().when(["platform", "multiLocation", "editMode"], {
    is: (platform, multiLocation, editMode) =>
      editMode === "location" &&
      platform === "Physical" &&
      multiLocation !== true,
    then: Yup.string("Please enter a 6 digit number")
      .matches(/^[0-9]+$/, "Please enter a 6 digit number")
      .min(6, "Please enter a 6 digit number")
      .max(6, "Please enter a 6 digit number")
      .required("Please indicate the postal code of the volunteer job"),
  }),
  type: Yup.string().when("editMode", {
    is: "commitment",
    then: Yup.string().required(
      "Please indicate if the commitment type is long term or ad hoc"
    ),
  }),
  flexiDate: Yup.bool(),
  longStartDate: Yup.date().when(["type", "flexiDate", "editMode"], {
    is: (type, flexiDate, editMode) =>
      editMode === "commitment" && type === "Long term" && flexiDate !== true,
    then: Yup.date().required(
      "Please indicate the start date of the volunteer job (If the date is flexible, tick 'Start and end dates are flexible'"
    ),
  }),
  longEndDate: Yup.date().when(["type", "flexiDate", "editMode"], {
    is: (type, flexiDate, editMode) =>
      editMode === "commitment" && type === "Long term" && flexiDate !== true,
    then: Yup.date().required(
      "Please indicate the end date of the volunteer job (If the date is flexible, tick 'Start and end dates are flexible'"
    ),
  }),
  flexiHours: Yup.bool(),
  longHours: Yup.number().when(["type", "flexiHours", "editMode"], {
    is: (type, flexiHours, editMode) =>
      editMode === "commitment" && type === "Long term" && flexiHours !== true,
    then: Yup.number("Please enter a number")
      .positive("Please only enter a positive number")
      .required("Please indicate the number of hours to commit"),
  }),
  flexiShifts: Yup.bool(),
  shiftNumber: Yup.number("Please only enter numbers"),
  shift1Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 1,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift1Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 1,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift1End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 1,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift2Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 2,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift2Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 2,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift2End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 2,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift3Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 3,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift3Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 3,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift3End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 3,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift4Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 4,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift4Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 4,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift4End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 4,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift5Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 5,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift5Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 5,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift5End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 5,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift6Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 6,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift6Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 6,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift6End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 6,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift7Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 7,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift7Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 7,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift7End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 7,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift8Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 8,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift8Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 8,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift8End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 8,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift9Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 9,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift9Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 9,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift9End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 9,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  shift10Date: Yup.date().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 10,
    then: Yup.date().required("Please indicate the date of the shift"),
  }),
  shift10Start: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 10,
    then: Yup.string().required("Please indicate the start time of the shift"),
  }),

  shift10End: Yup.string().when(["shiftNumber", "editMode"], {
    is: (shiftNumber, editMode) =>
      editMode === "commitment" && shiftNumber >= 10,
    then: Yup.string().required("Please indicate the end time of the shift"),
  }),
  addInfo: Yup.string(),
  closingDate: Yup.date().when(["noClosingDate", "editMode"], {
    is: (noClosingDate, editMode) =>
      editMode === "closingDate" && !noClosingDate,
    then: Yup.date().required(
      "Please indicate the closing date of volunteer applications"
    ),
  }),
  noClosingDate: Yup.bool(),
  pocName: Yup.string().when("editMode", {
    is: "contact",
    then: Yup.string().required("Please enter the name of contact person"),
  }),
  pocNo: Yup.string().when("editMode", {
    is: "contact",
    then: Yup.string("Please enter only numbers")
      .matches(/^[0-9]+$/, "Please enter a 8 digit number")
      .min(8, "Please enter a 8 digit number")
      .max(8, "Please enter a 8 digit number")
      .required("Please enter the mobile number of contact person"),
  }),
  pocEmail: Yup.string().when("editMode", {
    is: "contact",
    then: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter the email address of contact person"),
  }),
});
