import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { SessionStorageKeys, SignupFormSchema, labels } from "../../helper";
import { pageRoutes } from "../../helper";
import { userLogin } from "../../api/apiRegister";
import { SessionStorage } from "../../utils";
import Select from "react-dropdown-select";

const LoginFormikForm = ({ operator }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      operator: "",
      password: "",
    },
    validationSchema: SignupFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (values) {
        const res = await userLogin(values);
        if (res) {
          sessionStorage.setItem('user', res.Items);
          navigate('/states');
        }
      }
      setSubmitting(false);
    }
  })
  return (
    <div className="formik-conatiner login">
      <label className="label">{labels.LOG_IN}</label>
      <form className="formik-form" onSubmit={formik.handleSubmit}>
        <div className="formik-group">
          <label className="formik-label">User Name</label>
          <Select
            name="operator"
            className="form-field"
            options={operator}
            placeholder="Select a State"
            value={formik.values.operator}
            onChange={(value) => { formik.setFieldValue("operator", value[0].value); sessionStorage.setItem('userName', value[0].label) }}
          />
          {formik.touched.operator && formik.errors.operator && (
            <div className="error-field  text-danger">{formik.errors.operator}</div>
          )}
        </div>
        <div className="formik-group">
          <label className="formik-label">{labels.PASSWORD}</label>
          <input
            name="password"
            type="password"
            className={`form-field ${formik.touched.password && formik.errors.password ? "error" : ""
              }`}
            placeholder={labels.PASSWORD}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-field text-danger">{formik.errors.password}</div>
          )}
          <div className="forgot-password">
            <div className="forgotPassword-link">
              <label className="link" onClick={() => navigate(pageRoutes.passwordReset)}>
                {labels.FORGOT_PASSWORD}
              </label>
            </div>
          </div>
        </div>
        <button className="submit-btn" type="submit" disabled={formik.isSubmitting}>
          {labels.SUBMIT}
        </button>
      </form>
      <div className="register">
        <label>{labels.DONT_HAVE}</label>
        <label className="link" onClick={() => navigate(pageRoutes.register)}>
          {labels.REGISTER_ACCOUNT}
        </label>
      </div>
    </div>
  );
};

export { LoginFormikForm };
