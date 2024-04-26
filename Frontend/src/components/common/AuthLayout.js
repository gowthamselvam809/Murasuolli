import React from "react";
import logo from "../../assets/murasuoliLogo.jpg"

const AuthLayOut = (props) => {
  const { children, ClassName } = props
  return (
    <div className="login__container">
      <div className="login__log">
        <img className="logo" alt="logo" src={logo} />
      </div>
      <div className={`login__form ${ClassName}`}>
        {children}
      </div>
    </div>
  )
}

export { AuthLayOut };