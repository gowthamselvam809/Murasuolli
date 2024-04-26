import React from "react";
import { ForgotPassword } from "../../components/forgotPassword";
import { AuthLayOut } from "../../components/common";

const PasswordReset = () => {

  return (
    <AuthLayOut>
      <ForgotPassword />
    </AuthLayOut>
  )
}

export { PasswordReset };