import React, { useState } from "react";
import { LoginFormikForm } from "../../components/login";
import { AuthLayOut } from "../../components/common";
import { CompanyForm } from "../../components/login/companyForm";

const Login = () => {
  const [isSelectedCompany, setIsCompanySelected] = useState(false);
  const [operator, setOperator] = useState([]);

  return (
    <AuthLayOut>
      {/* <LoginHookForm /> */}
      {
        isSelectedCompany ?
          <LoginFormikForm operator={operator} />
          :
          <CompanyForm setIsCompanySelected={setIsCompanySelected} setOperator={setOperator} />
      }
    </AuthLayOut>
  )
}

export { Login };