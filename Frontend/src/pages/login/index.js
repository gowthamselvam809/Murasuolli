import React from "react";
import { LoginFormikForm } from "../../components/login";
import { AuthLayOut } from "../../components/common";

const Login = () => {

  return (
    <AuthLayOut>
      {/* <LoginHookForm /> */}
      <LoginFormikForm />
    </AuthLayOut>
  )
}

export { Login };