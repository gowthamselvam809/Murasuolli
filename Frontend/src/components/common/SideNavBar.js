import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import classNames from "classnames"; // Import classNames library

import { Common, menuItem, menuItemTypes, pageRoutes } from "../../helper";
import { SessionStorage } from "../../utils";

import LogOutIcon from "../../assets/Logout.png";
import logo from "../../assets/murasuoliLogo.jpg";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = () => {
    SessionStorage.clearAll();
    navigate(pageRoutes.login)
  }

  return (
    <div className="side-nav__container">
      <img src={logo} alt="" className="nav__logo" />
      <div className="side-nav__paths">
        {menuItem?.map((item, index) => (
          <label
            className={classNames("router-link", {
              "active-link": location.pathname === item.path // Add 'active-link' class if the path matches the current location
            })}
            key={index}
          >
            {
              <>
                {item.type === menuItemTypes.list ? (
                  <Accordion className="nav__dropdown">
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header className="nav__item">
                        <img className="nav__icon" src={item.image} alt="" />
                        <label className="nav__item">{item.title}</label>
                      </Accordion.Header>
                      <Accordion.Body>
                        {item.items.map((listItem, i) => (
                          <div
                            key={i}
                            onClick={() => navigate(listItem.path)}
                            className={classNames("nav__item", {
                              "active-link": location.pathname === listItem.path // Add 'active-link' class if the path matches the current location
                            })}
                          >
                            <label className="nav__item">{listItem.title}</label>
                          </div>
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  <div
                    className={classNames("nav__item", {
                      "active-link": location.pathname === item.path // Add 'active-link' class if the path matches the current location
                    })}
                    onClick={() => navigate(item.path)}
                    key={index}
                  >
                    <img className="nav__icon" src={item.image} alt="" />
                    <label>{item.title}</label>
                  </div>
                )}
              </>
            }
          </label>
        ))}
        <div className="nav__item" style={{ marginLeft: 30 }} onClick={() => logOut()}>
          <label className="nav__label">
            <img className="nav__icon" src={LogOutIcon} alt="" />
            {Common.Logout}
          </label>
        </div>
      </div>
    </div>
  );
};

export { SideNav };
