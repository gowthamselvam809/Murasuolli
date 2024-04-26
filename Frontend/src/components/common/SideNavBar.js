import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

// import { Common, menuItem, menuItemTypes, pageRoutes, SessionStorageKeys, Url } from "../../helper";
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
        {menuItem?.map((item, index) => <label className="router-link" key={index}>
          {
            <>
              {item.type === menuItemTypes.list ?
                <Accordion className="nav__dropdown">
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header className="nav__item">
                      {/* </Accordion.Header><Accordion.Header className="nav__item" style={{ display: item?.role?.includes(parseInt(SessionStorage.getItem(SessionStorageKeys.UserRole))) ? "flex" : "none" }} > */}
                      <img className="nav__icon" src={item.image} alt="" />
                      <label className="nav__item">{item.title}</label>
                    </Accordion.Header>
                    <Accordion.Body>
                      {item.items.map((listItem, i) => (
                        <div key={i} onClick={() => navigate(listItem.path)} >
                          <img className="nav__icon" src={listItem.image} alt="" />
                          <label className="nav__item">{listItem.title}</label>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                //: <div className="nav__item" key={index} onClick={() => navigate(item.path)} style={{ display: item?.role?.includes(parseInt(SessionStorage.getItem(SessionStorageKeys.UserRole))) ? "flex" : "none" }}>
                : <div className="nav__item" key={index} onClick={() => navigate(item.path)} >
                  <img className="nav__icon" src={item.image} alt="" />
                  <label>{item.title}</label>
                </div>}
            </>
          }

        </label>)
        }
        <div className="nav__item" style={{ marginLeft: 30 }} onClick={() => logOut()}>
          <label className="nav__label">
            <img className="nav__icon" src={LogOutIcon} alt="" />
            {Common.Logout}
          </label>
        </div>
      </div>
    </div>
  )
}

export { SideNav };