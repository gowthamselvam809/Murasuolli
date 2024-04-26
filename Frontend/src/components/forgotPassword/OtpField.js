import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

import { labels } from "../../helper";
import { OtpValidationSchema } from "../../helper/validators";

const OtpField = (props) => {
  const { isOtpVerified, setIsOtp } = props;

  const intialOtpValue = {
    otp: "",
  }

  const handleOtpSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      if (values) {
        setIsOtp(values.otp)
      }
      setSubmitting(false);
    }, 500);
  }

  return (
    <Formik
      initialValues={intialOtpValue}
      validationSchema={OtpValidationSchema}
      onSubmit={handleOtpSubmit}
    >
      {
        ({ isSubmitting, handleSubmit }) => (
          <form className="formik-form" onSubmit={handleSubmit}>
            <div className="formik-group">
              <label className="formik-label">{labels.ENTER_OTP}</label>
              <Field type="text" id="otp" name="otp" className="form-field" placeholder="Enter OTP" />
              <ErrorMessage name="otp" component="label" className="error-field" />
            </div>
            {!isOtpVerified && <button className="submit-btn" type="submit" disabled={isSubmitting}>
              {labels.SEND_OTP}
            </button>}
          </form>
        )
      }
    </Formik>
  )
}

export { OtpField };