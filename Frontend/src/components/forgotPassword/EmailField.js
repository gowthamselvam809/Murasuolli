import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

import { labels } from "../../helper";
import { EmailValidationSchema } from "../../helper/validators";

const EmailField = (props) => {
  const { isEmailVerified, setIsEmail } = props;

  const initialEmailValue = {
    email: "",
  };

  const handleEmailSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      if (values) {
        setIsEmail(values.email);
      }
      setSubmitting(false);
    }, 500);
  }

  return (
    <Formik
      initialValues={initialEmailValue}
      validationSchema={EmailValidationSchema}
      onSubmit={handleEmailSubmit}
    >
      {
        ({ isSubmitting, errors, handleSubmit }) => (
          <form className="formik-form" onSubmit={handleSubmit}>
            <div className="formik-group">
              <label className="formik-label">{labels.EMAIL}</label>
              <Field name="email" type="email" className={`form-field ${errors.email ? "error" : ""}`} placeholder="Email" />
              <ErrorMessage className="error-field" name="email" component="label" />
            </div>
            {!isEmailVerified && <button className="submit-btn" type="submit" disabled={isSubmitting}>
              {labels.SEND_OTP}
            </button>}
          </form>
        )
      }
    </Formik>
  )
}

export { EmailField };