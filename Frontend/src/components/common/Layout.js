import React from "react";
import { SideNav, TopNavBar } from "./";

const Layout = (porps) => {
  const { children } = porps;
  return (
    <div className="lay-out__container">
      <div className="lay-out__content">
        <SideNav />
        <div className="children__container">
          <div className="top-nav-bar__container">
            <TopNavBar />
          </div>
          <div className="main__content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Layout };  