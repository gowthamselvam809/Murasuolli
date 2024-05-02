import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { SessionStorageKeys, SignupFormSchema, labels } from "../../helper";
import { pageRoutes } from "../../helper";
import { userLogin } from "../../api/apiRegister";
import { SessionStorage } from "../../utils";
import Select from "react-dropdown-select";
// import { SocialLoginPage } from "./SocialLoginPage";

const LoginFormikForm = () => {

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    if (values) {
      const res = await userLogin(values);
      if (res) {
        SessionStorage.setItem(SessionStorageKeys.SessionToken, res.Items[0].token);
        SessionStorage.setItem(SessionStorageKeys.UserRole, res.Items[0].type);
        navigate(pageRoutes.dashboard);
      }
    }
    setSubmitting(false);
  }

  return (
    <div className="formik-conatiner login">
      <label className="label">{labels.LOG_IN}</label>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, handleSubmit }) => (
          <form className="formik-form" onSubmit={handleSubmit}>
            <div className="formik-group">
              <label className="formik-label">User Name</label>
              {/* <Field name="email" type="email" className={`form-field ${errors.email ? "error" : ""}`} placeholder={labels.EMAIL} /> */}
              <Select
                name="email"
                className='form-field'
                options={[
                  { value: 1, label: "user 1" },
                  { value: 2, label: "user 2" }
                ]}
                // values={state}
                // onChange={(value) => setState(value)}
                placeholder="Select a State"
              />
              <ErrorMessage className="error-field" name="email" component="label" />
            </div>
            <div className="formik-group">
              <label className="formik-label">{labels.PASSWORD}</label>
              <Field name="password" type="password" className={`form-field ${errors.password && "error"}`} placeholder={labels.PASSWORD} />
              <div className="forgot-password">
                <ErrorMessage className="error-field" name="password" component="label" />
                <div className="forgotPassword-link">
                  <label className="link" onClick={() => { navigate(pageRoutes.passwordReset) }}>{labels.FORGOT_PASSWORD}</label>
                </div>
              </div>

            </div>
            <button className="submit-btn" onClick={() => { navigate('/states') }} type="button" disabled={isSubmitting}>
              {labels.SUBMIT}
            </button>
            {/* <SocialLoginPage /> */}
          </form>
        )}
      </Formik>

      <div className="register">
        <label>{labels.DONT_HAVE}</label>
        <label className="link" onClick={() => { navigate(pageRoutes.register) }}>{labels.REGISTER_ACCOUNT}</label>
      </div>
    </div>
  );
};

export { LoginFormikForm };