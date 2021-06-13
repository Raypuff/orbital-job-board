import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "*Titles must have at least 2 characters")
    .max(100, "Titles can't be longer than 100 characters")
    .required("*Title is required"),
  pocEmail: Yup.string()
    .email("Must be a valid email address")
    .required("PP is a field that you MUST fill"),
  addInfo: Yup.string(),
  startDate: Yup.date().required(),
  dropdown: Yup.string().required(),
  terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
});

const PostAJobTest = () => {
  return (
    <Formik
      initialValues={{
        title: "",
        pocEmail: "",
        addInfo: "",
        startDate: "",
        dropdown: "Yes",
        terms: false,
      }}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isSubmitting,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          {console.log(values)}
          <Form.Group controlId="formTitle">
            <Form.Label>Volunteer title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Python teacher"
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
          <Form.Group controlId="formEmail">
            <Form.Label>POC Email</Form.Label>
            <Form.Control
              type="email"
              name="pocEmail"
              placeholder="raynerljm@gmail.com"
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
          <Form.Group controlId="formAddInfo">
            <Form.Label>Additional information</Form.Label>
            <Form.Control
              type="text"
              name="addInfo"
              placeholder="My pp is large"
              value={values.addInfo}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.addInfo && !errors.addInfo}
              isInvalid={touched.addInfo && errors.addInfo}
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.startDate && !errors.startDate}
              isInvalid={touched.startDate && errors.startDate}
            />
          </Form.Group>
          <Form.Group controlId="formDropdown">
            <Form.Label>Dropdown</Form.Label>
            <Form.Control
              as="select"
              name="dropdown"
              value={values.dropdown}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.dropdown && !errors.dropdown}
              isInvalid={touched.dropdown && errors.dropdown}
            >
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTerms">
            <Form.Check
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={touched.terms && !errors.terms}
              isInvalid={touched.terms && errors.terms}
              feedback={errors.terms}
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};
export default PostAJobTest;
