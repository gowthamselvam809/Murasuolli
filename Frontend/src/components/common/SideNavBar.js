import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import classNames from "classnames"; // Import classNames library

import { requestComponent } from "../../utils/common";
import { Common, menuItem, menuItemTypes, pageRoutes } from "../../helper";
import { SessionStorage } from "../../utils";

import LogOutIcon from "../../assets/Logout.png";
import logo from "../../assets/murasuoliLogo.jpg";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmed, setConfirmed] = useState(requestComponent())
  const logOut = () => {
    SessionStorage.clearAll();
    navigate(pageRoutes.login);
  };

  useEffect(() => {
    setConfirmed(requestComponent());
  }, [location.pathname])

  useEffect(() => {
    if (!confirmed) {
      setConfirmed(requestComponent());
    }
  }, [confirmed])

  return (
    <div className="side-nav__container">
      <img src={logo} alt="" className="nav__logo" />
      <div className="side-nav__paths">
        {menuItem?.map((item, index) => (
          <label
            className={classNames("router-link", {
              "active-link": location.pathname === item.path,
            })}
            key={index}
          >
            {item.type === menuItemTypes.list ? item.valid && confirmed ? (
              <Accordion className="nav__dropdown">
                <Accordion.Item eventKey={index}>
                  <Accordion.Header className="nav__item">
                    <img className="nav__icon" src={item.image} alt="" />
                    <label
                      className={classNames("nav__item", {
                        "active-link": item.items.some(
                          (listItem) => location.pathname === listItem.path
                        ),
                      })}
                      style={{ fontSize: 18 }}
                    >
                      {item.title}
                    </label>
                  </Accordion.Header>
                  <Accordion.Body>
                    {item.items.map((listItem, i) => (
                      <div
                        key={i}
                        className={classNames("nav__item", {
                          "active-link": location.pathname === listItem.path,
                        })}
                      >
                        {listItem.type === menuItemTypes.list ? (
                          <Accordion>
                            <Accordion.Item eventKey={`${index}-${i}`}>
                              <Accordion.Header className="nav__item">
                                {/* <img
                                  className="nav__icon"
                                  src={listItem.image}
                                  alt=""
                                /> */}
                                <label
                                  className={classNames("nav__item", {
                                    "active-link":
                                      location.pathname === listItem.path,
                                  })}
                                  style={{ marginLeft: 18, fontSize: 15 }}
                                  onClick={() => navigate(listItem.path)}
                                >
                                  {listItem.title}
                                </label>
                              </Accordion.Header>
                              <Accordion.Body>
                                {listItem.items.map((nestedItem, j) => (
                                  <div
                                    key={j}
                                    className={classNames("nav__item", {
                                      "active-link":
                                        location.pathname === nestedItem.path,
                                    })}
                                    onClick={() => navigate(nestedItem.path)}
                                    style={{ marginLeft: 18, fontSize: 15 }}
                                  >
                                    {nestedItem.title}
                                  </div>
                                ))}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        ) : (
                          <div
                            onClick={() => navigate(listItem.path)}
                            style={{ marginLeft: 18, fontSize: 15 }}
                          >
                            {listItem.title}
                          </div>
                        )}
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : (<>
              <img className="nav__icon" src={item.image} alt="" />
              <label
                className={classNames("nav__item", {
                  "active-link": item.items.some(
                    (listItem) => location.pathname === listItem.path
                  ),
                })}
                style={{ fontSize: 18 }}
              >
                {item.title}
              </label>
            </>) : item.valid && confirmed ? (

              <div
                className={classNames("nav__item", {
                  "active-link": location.pathname === item.path,
                })}
                onClick={() => navigate(item.path)}
                key={index}
              >
                <img className="nav__icon" src={item.image} alt="" />
                <label>{item.title}</label>
              </div>
            ) : (
              <div
                className={classNames("nav__item", {
                  "active-link": location.pathname === item.path,
                })}
                key={index}
              >
                <img className="nav__icon" src={item.image} alt="" />
                <label>{item.title}</label>
              </div>
            )}
          </label>
        ))}
        <div
          className="nav__item"
          style={{ marginLeft: 30 }}
          onClick={logOut}
        >
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
