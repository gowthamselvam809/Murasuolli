import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import { userRegister } from "../../api/apiRegister";

import { ErrorToast } from "../common";

import { ErrorMessage as Messages, SessionStorageKeys, pageRoutes, RegisterSchema, labels, RolesEnum, Roles, Common } from "../../helper";
import { SessionStorage, isEmptyObject } from "../../utils";

const RegisterForm = () => {
  const initialValues = { firstName: "", lastName: "", phone: "", email: "", city: "", password: "", role: "" };
  const [role, setRole] = useState();
  const navigate = useNavigate();

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
          password: values.password,
          city: values.city,
          phone: values.phone,
          type: role,
          active: 1
        }
        const response = await userRegister(request);
        if (!isEmptyObject(response)) {
          SessionStorage.setItem(SessionStorageKeys.SessionToken, response.Items.token);
          SessionStorage.setItem(SessionStorageKeys.UserRole, response.Items.type);
          navigate(pageRoutes.dashboard);
        }
      }
    }
    setSubmitting(false);
  }

  return (
    <div className="formik-conatiner">
      <label className="label">{labels.REGISTER}</label>
      <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors}) => {
          return (<Form className="formik-form">
            <Row>
              <Col md={6}>
                <div className="formik-group">
                  <label className="formik-label">{labels.FIRST_NAME}</label>
                  <Field name="firstName" type="text" className={`form-field ${errors.firstName ? "error" : ""}`} placeholders="Email" />
                  <ErrorMessage className="error-field" name="firstName" component="label" />
                </div>
                <div className="formik-group">
                  <label className="formik-label">{labels.LAST_NAME}</label>
                  <Field name="lastName" type="text" className={`form-field ${errors.lastName && "error"}`} placeholders="Password" />
                  <ErrorMessage className="error-field" name="lastName" component="label" />
                </div>
                <div className="formik-group">
                  <label className="formik-label">{labels.EMAIL}</label>
                  <Field name="email" type="email" className={`form-field ${errors.email && "error"}`} placeholders="Password" />
                  <ErrorMessage className="error-field" name="email" component="label" />
                </div>
                <div className="formik-group">
                  <label className="formik-label">{labels.PHONE_NO}</label>
                  <Field name="phone" type="text" className={`form-field ${errors.phone && "error"}`} placeholders="Password" />
                  <ErrorMessage className="error-field" name="phone" component="label" />
                </div>
              </Col>
              <Col md={6}>
                <div className="formik-group">
                  <label className="formik-label">{labels.CITY}</label>
                  <Field name="city" type="text" className={`form-field ${errors.city && "error"}`} placeholders="Password" />
                  <ErrorMessage className="error-field" name="city" component="label" />
                </div>
                <div className="formik-group">
                  <label className="formik-label">{labels.PASSWORD}</label>
                  <Field name="password" type="password" className={`form-field ${errors.password && "error"}`} placeholders="Password" />
                  <ErrorMessage className="error-field" name="password" component="label" />
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
            <button className="submit-btn regiter mt-3" type="submit" disabled={isSubmitting}>
              {labels.SUBMIT}
            </button>
          </Form>);
        }}
      </Formik>
    </div>
  );
};

export { RegisterForm };