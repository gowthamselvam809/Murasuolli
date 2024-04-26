import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import { labels, pageRoutes } from "../../helper";
import { PasswordValidationSchema } from "../../helper/validators";
import { passwordReset } from "../../api/apiRegister";
import { isEmptyObject } from "../../utils";

const SetPassword = () => {
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const navigate = useNavigate();
  const initialPasswordValues = {
    password: "",
    confirmPassword: ""
  }

  const setNewPassword = async (values) => {
    const newPassword = await passwordReset({ password: values.password });
    if (!isEmptyObject(newPassword.Items)) {
      navigate(pageRoutes.login);
    }
  }

  const handleResetPassword = (values, { setSubmitting }) => {
    setTimeout(() => {
      if (values.password === values.confirmPassword) {
        setNewPassword(values)
      } else {
        setPasswordsDontMatch(true)
      }
      setSubmitting(false);
    }, 500);
  }

  return (
    <Formik
      initialValues={initialPasswordValues}
      validationSchema={PasswordValidationSchema}
      onSubmit={handleResetPassword}
    >
      {
        ({ errors, handleSubmit }) => (
          <form className='formik-form' onSubmit={handleSubmit}>
            <div className='formik-group'>
              <label className='formik-label'>{labels.PASSWORD}</label>
              <Field name="password" type="password" className={`form-field ${errors.password && "error"}`} placeholder={labels.PASSWORD} />
              <ErrorMessage className='error-field' name="password" component="label" />
            </div>
            <div className='formik-group'>
              <label className='formik-label'>{labels.CONFIRM_PASSWORD}</label>
              <Field name="confirmPassword" type="password" className={`form-field ${errors.password && "error"}`} placeholder={labels.CONFIRM_PASSWORD} />
              {passwordsDontMatch && <ErrorMessage className='error-field' name="confirmPassword" component="label" >{labels.PASSWORDS_DONT_MATCH}</ErrorMessage>}
            </div>
            <button className='submit-btn' type="submit">
              {labels.SUBMIT}
            </button>
          </form>
        )
      }
    </Formik>
  )
}

export { SetPassword };