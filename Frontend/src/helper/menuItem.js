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
    type: menuItemTypes.list,
    title: "Master",
    image: dashboardIcon,
    path: '',
    role: [],
    items: [
      {
        title: "agent",
        image: ProfileIcon,
        path: "/agent",
      },
      {
        title: "magazine",
        image: ProfileIcon,
        path: "/magazine",
      },
      {
        title: "bank",
        image: ProfileIcon,
        path: '/bank',
      },
      {
        title: "reason",
        image: ProfileIcon,
        path: '/reason',
      },
      {
        title: "Copy Confirm",
        image: ProfileIcon,
        path: '/copyConfirm',
      },
      {
        title: "commission",
        image: ProfileIcon,
        path: '/commission',
      },
      {
        title: "operator",
        image: ProfileIcon,
        path: '/operator',
      },
      {
        title: "districts",
        image: ProfileIcon,
        path: '/districts',
      },
    ]
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