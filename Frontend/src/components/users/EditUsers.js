import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Col, Row } from "react-bootstrap";

import { AddUserSchema, SucessMessages, labels } from "../../helper";
import { SucessToast } from "../common";

import { editUser } from "../../api/apiRegister";

const EditUser = (props) => {
  const { userId, showModal, setShowModal, getUsersList } = props;
  const editData = userId;

  const initialValues = {
    id: editData?.id || "",
    firstName: editData?.firstName || "",
    lastName: editData?.lastName || "",
    email: editData?.email || "",
    city: editData?.city || "",
    phone: editData?.phone || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      let request = {
        id: initialValues.id,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        city: values.city
      };
      const response = await editUser(request);
      if (response) {
        SucessToast(SucessMessages.USER_UPDATED_SUCCESSFULLY);
        getUsersList();
        setShowModal(!showModal);
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={AddUserSchema}
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
    >
      {({ isSubmitting, errors }) => {
        return (<Form className="formik-form">
          <Row>
            <Col md={6}>
              <div className="formik-group">
                <label className="formik-label black">{labels.FIRST_NAME}</label>
                <Field name="firstName" type="text" className={`form-field ${errors.firstName ? "error" : ""}`} placeholder={labels.FIRST_NAME} />
                <ErrorMessage className="error-field" name="firstName" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.LAST_NAME}</label>
                <Field name="lastName" type="text" className={`form-field ${errors.lastName && "error"}`} placeholder={labels.LAST_NAME} />
                <ErrorMessage className="error-field" name="lastName" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.EMAIL}</label>
                <Field name="email" type="email" className={`form-field ${errors.email && "error"}`} placeholder={labels.EMAIL} disabled={true} />
                <ErrorMessage className="error-field" name="email" component="label" />
              </div>
            </Col>
            <Col md={6}>
              <div className="formik-group">
                <label className="formik-label black">{labels.PHONE_NO}</label>
                <Field name="phone" type="text" className={`form-field ${errors.phone && "error"}`} placeholder={labels.PHONE_NO} />
                <ErrorMessage className="error-field" name="phone" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.CITY}</label>
                <Field name="city" type="text" className={`form-field ${errors.city && "error"}`} placeholder={labels.CITY} />
                <ErrorMessage className="error-field" name="city" component="label" />
              </div>
            </Col>
          </Row>
          <button className="submit-btn update-profile" type="submit" disabled={isSubmitting}>
            {labels.SUBMIT}
          </button>
        </Form>);
      }}
    </Formik>
  );
};

export { EditUser };