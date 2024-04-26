import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Col, Row } from "react-bootstrap";

import { ErrorToast, SucessToast } from "../common";

import { UpdateProfileSchema, labels, ErrorMessage as Messages, Roles, RolesEnum, SucessMessages } from "../../helper";
import { updateProfile } from "../../api/apiRegister";
import { UploadImage, isEmptyObject } from "../../utils";

const UpdateForm = (props) => {
  const { userProfile } = props
  const [role, setRole] = useState();

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      let request = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        city: values.city,
        type: role,
        image: values.image.name
      }
      const profileUpdate = await updateProfile(request);
      let url = profileUpdate.Items.fileUploadUrl[0].uploadUrl;
      let uploadImage = await UploadImage(url, values.image);
      if (uploadImage) {
        !isEmptyObject(profileUpdate) && SucessToast(SucessMessages.PROFILE_UPDATED_SUCCESSFULLY)
      }
    }
    setSubmitting(false);
  }

  const handleRoleChange = (e) => {
    switch (e.target.value) {
    case Roles.none: ErrorToast(Messages.PLEASE_SELECT_A_ROLE); break;
    case Roles.user: setRole(RolesEnum.User); break;
    case Roles.admin: setRole(RolesEnum.Admin); break;
    case Roles.superAdmin: setRole(RolesEnum.SuperAdmin); break;
    default: ErrorToast(Messages.PLEASE_SELECT_A_ROLE); break;
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        phone: userProfile.phone,
        city: userProfile.city,
        role: userProfile.type,
        image: ""
      }}
      validationSchema={UpdateProfileSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, errors, handleSubmit }) => (
        <form className="formik-form" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <div className="formik-group">
                <label className="formik-label black">{labels.FIRST_NAME}</label>
                <Field name="firstName" type="firstName" className={`form-field ${errors.firstName ? "error" : ""}`} placeholder={labels.FIRST_NAME} />
                <ErrorMessage className="error-field" name="firstName" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.LAST_NAME}</label>
                <Field name="lastName" type="lastName" className={`form-field ${errors.lastName && "error"}`} placeholder={labels.LAST_NAME} />
                <ErrorMessage className="error-field" name="lastName" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.EMAIL}</label>
                <Field name="email" type="email" className={`form-field ${errors.email && "error"}`} placeholder={labels.EMAIL} />
                <ErrorMessage className="error-field" name="email" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.PHONE_NO}</label>
                <Field name="phone" type="phone" className={`form-field ${errors.phone && "error"}`} placeholder={labels.PHONE_NO} />
                <ErrorMessage className="error-field" name="phone" component="label" />
              </div>
            </Col>
            <Col md={6}>
              <div className="formik-group">
                <label className="formik-label black">{labels.CITY}</label>
                <Field name="city" type="city" className={`form-field ${errors.city && "error"}`} placeholder={labels.CITY} />
                <ErrorMessage className="error-field" name="city" component="label" />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.IMAGE}</label>
                <input name="image" type="file" onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }} />
              </div>
              <div className="formik-group">
                <label className="formik-label black">{labels.ROLE}</label>
                <select className="form-field__disabled" name="role" value={userProfile.type} onChange={(e) => handleRoleChange(e)} disabled={true}>
                  <option value={RolesEnum.None} >{Roles.none}</option>
                  <option value={RolesEnum.User}>{Roles.user}</option>
                  <option value={RolesEnum.Admin}>{Roles.admin}</option>
                  <option value={RolesEnum.SuperAdmin}>{Roles.superAdmin}</option>
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
  )
}

export { UpdateForm }