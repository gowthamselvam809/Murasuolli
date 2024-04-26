import React from "react";
import { RegisterForm } from "../../components/register";
import { AuthLayOut } from "../../components/common";

const Register = () => {

  return (
    <AuthLayOut ClassName="scroll">
      <RegisterForm />
    </AuthLayOut>
  )
}

export { Register };