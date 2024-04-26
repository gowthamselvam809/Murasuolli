import { pageRoutes } from "./pageRoutes";
import { menuItemTypes } from "./constants";
// import { RolesEnum } from "./constants"; 

import dashboardIcon from "../assets/dashboardIcon.png";
import HomeIcon from "../assets/transaction.png";
import SettingsIcon from "../assets/Utilities.png";
import UsersIcon from "../assets/reports.png";
import ProfileIcon from "../assets/ProfileIcon.png";

const menuItem = [
  {
    type: menuItemTypes.link,
    title: "Master",
    image: dashboardIcon,
    path: pageRoutes.master,
    role: []
  },
  {
    type: menuItemTypes.link,
    title: "Transaction",
    image: HomeIcon,
    path: pageRoutes.transaction,
    role: []
  },
  {
    type: menuItemTypes.link,
    title: "Reports",
    image: UsersIcon,
    path: pageRoutes.reports,
    role: []
  },
  {
    type: menuItemTypes.link,
    title: "Utilities",
    image: SettingsIcon,
    path: pageRoutes.utilities,
    role: []
  }
  // {
  //   type: menuItemTypes.list,
  //   title: "Settings",
  //   image: SettingsIcon,
  //   path: "",
  //   role: [],
  //   items: [
  //     {
  //       title: "profile",
  //       image: ProfileIcon,
  //       path: pageRoutes.profile,
  //     }
  //   ]
  // }
]

export { menuItem };