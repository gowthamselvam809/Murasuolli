import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Col, Row } from "react-bootstrap";

import { ErrorMessage as Messages, AddUserSchema, Roles, RolesEnum, labels, Common, SucessMessages } from "../../helper";
import { addUser } from "../../api/apiRegister";
import { ErrorToast, SucessToast } from "../common";
import { isEmptyObject } from "../../utils";

const AddUser = (props) => {

  const { getUsersList, showModal, setShowModal } = props;

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    role: "",
  };
  const [role, setRole] = useState();

  const handleRoleChange = (e) => {
    switch (e.target.value) {
    case Roles.none: ErrorToast(Messages.PLEASE_SELECT_A_ROLE); break;
    case Roles.user: setRole(RolesEnum.User); break;
    case Roles.admin: setRole(RolesEnum.Admin); break;
    case Roles.superAdmin: setRole(RolesEnum.SuperAdmin); break;
    default: ErrorToast(Messages.PLEASE_SELECT_A_ROLE); break;
    }
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      if (role) {
        let request = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          city: values.city,
          phone: values.phone,
          type: role,
          active: 1
        }
        const response = await addUser(request);
        if (!isEmptyObject(response)) {
          SucessToast(SucessMessages.USER_ADDED_SUCCESSFULLY);
          getUsersList();
          setShowModal(!showModal);
        }
      }
    }
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddUserSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, handleSubmit }) => (
        <form className="formik-form" onSubmit={handleSubmit}>
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
                <Field name="email" type="email" className={`form-field ${errors.email && "error"}`} placeholder={labels.EMAIL} />
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
              <div className="formik-group">
                <label className="formik-label">{labels.ROLE}</label>
                <select className="form-field" name="role" onChange={(e) => handleRoleChange(e)} >
                  <option value={Roles.none} >{Common.SelectRole}</option>
                  <option value={Roles.user}>{Roles.user}</option>
                  <option value={Roles.admin}>{Roles.admin}</option>
                  <option value={Roles.superAdmin}>{Roles.superAdmin}</option>
                </select>
              </div>
            </Col>
          </Row>
          <button className="submit-btn update-profile" type="submit" disabled={isSubmitting}>
            {labels.SUBMIT}
          </button>
        </form>
      )}
    </Formik>
  );
};

export { AddUser };