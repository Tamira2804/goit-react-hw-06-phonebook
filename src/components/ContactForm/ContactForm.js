import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import './ContactForm.scss';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$/, 'Invalid characters'),
  number: Yup.string()
    .required('Number is required')
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      'Invalid phone number. Please use the format 111-11-11'
    ),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = ({ onAddContact }) => {
  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: shortid.generate(),
      name: values.name,
      number: values.number,
    };
    onAddContact(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="Form__container">
        <label htmlFor="nameId" className="Form__label">
          Name
        </label>
        <Field
          className="Form__input"
          type="text"
          placeholder="Jon Doe"
          name="name"
          id="nameId"
          required
        />
        <ErrorMessage name="name" component="div" className="Error" />

        <label htmlFor="numberId" className="Form__label">
          Number
        </label>
        <Field
          className="Form__input"
          type="tel"
          placeholder="123-45-67"
          name="number"
          id="numberId"
          required
        />
        <ErrorMessage name="number" component="div" className="Error" />

        <button type="submit" className="AddContact__btn">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
