import { pageRoutes } from "./pageRoutes";
import { menuItemTypes } from "./constants";
import { isConfirmed } from "../utils/utils";

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
    valid: isConfirmed(),
    path: '',
    role: [],
    items: [
      {
        title: "States",
        image: ProfileIcon,
        path: '/states',
      },
      {
        title: "Districts",
        image: ProfileIcon,
        path: '/districts',
      },
      {
        title: "Agent",
        image: ProfileIcon,
        path: "/agent",
      },
      {
        title: "Magazine",
        image: ProfileIcon,
        path: "/magazine",
      },
      {
        title: "Bank",
        image: ProfileIcon,
        path: '/bank',
      },
      {
        title: "Reason",
        image: ProfileIcon,
        path: '/reason',
      },
      {
        title: "Copy Confirm",
        image: ProfileIcon,
        path: '/copyConfirm',
      },
      {
        title: "Commission",
        image: ProfileIcon,
        path: '/commission',
      },
      // {
      //   title: "Operator",
      //   image: ProfileIcon,
      //   path: '/operator',
      // }
    ]
  },
  {
    type: menuItemTypes.list,
    title: "Transaction",
    image: HomeIcon,
    path: '',
    valid: isConfirmed(),
    role: [],
    items: [
      {
        type: menuItemTypes.list,
        title: "Issues",
        path: '',
        items: [
          {
            title: "Process Issue",
            image: ProfileIcon,
            path: '/processIssue',
          },
          {
            title: "Edit Issue",
            image: ProfileIcon,
            path: '/editIssue',
          }
        ]
      }, {
        type: menuItemTypes.list,
        title: "Supply",
        path: '',
        items: [
          {
            title: "Process Supply",
            image: ProfileIcon,
            path: '/processSupply',
          },
          {
            title: "View Supply",
            image: ProfileIcon,
            path: '/viewSupply',
          }
        ]
      },

      {
        title: "Receipts",
        image: ProfileIcon,
        path: '/receipts',
      },
      {
        title: "Debit Entry",
        image: ProfileIcon,
        path: '/debitEntry',
      },
      {
        title: "Credit Entry",
        image: ProfileIcon,
        path: '/creditEntry',
      },

    ]
  },
  {
    type: menuItemTypes.link,
    title: "Reports",
    valid: isConfirmed(),
    image: UsersIcon,
    path: pageRoutes.reports,
    role: []
  },
  {
    type: menuItemTypes.link,
    title: "Utilities",
    image: SettingsIcon,
    valid: isConfirmed(),
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

