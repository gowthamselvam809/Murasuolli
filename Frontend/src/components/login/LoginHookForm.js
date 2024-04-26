import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignupFormSchema, labels, pageRoutes } from "../../helper";

const LoginHookForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(SignupFormSchema), });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log({ data });
    reset();
  };

  return (
    <div className="formik-conatiner login">
      <form className="formik-form" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label className="label">{labels.LOG_IN}</label>
          <div className="formik-group">
            <label className="formik-label" htmlFor="email">{labels.EMAIL}</label>
            <input
              id="email"
              className={`form-field ${errors.email ? "error" : ""}`}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
              type="email"
              placeholder="example@mail.com"
            />
            {errors.email && <span className='error-field' role="alert">{errors.email.message}</span>}
          </div>
          <div className="formik-group">
            <label className="formik-label" htmlFor="password">{labels.PASSWORD}</label>
            <input
              id="password"
              className={`form-field ${errors.password && "error"}`}
              aria-invalid={errors.passward ? "true" : "false"}
              {...register("password")}
              type="password"
              placeholder="password"
            />
            {errors.password && <span className="error-field" role="alert">{errors.password.message}</span>}
          </div>
        </section>
        <button className="submit-btn" type="submit">{labels.SUBMIT}</button>
      </form>
      <div className="forgotPassword-link">
        <label className="link" onClick={() => { navigate(pageRoutes.passwordReset) }}>{labels.FORGOT_PASSWORD}</label>
      </div>
      <div className="register">
        <label>{labels.DONT_HAVE}</label>
        <label className="link" onClick={() => { navigate(pageRoutes.register) }}>{labels.REGISTER_ACCOUNT}</label>
      </div>
    </div>
  );
}


export { LoginHookForm };