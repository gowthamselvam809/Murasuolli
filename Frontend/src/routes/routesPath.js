
import React from "react";

import { Login, Home, PageNotFound, DashBoard, Register, Profile, PasswordReset, UsersList } from "./pages";
import { pageRoutes } from "../helper";
import AgentCreation from "../components/master/agentCreation";
import Magazine from "../components/master/magazine";
import Bank from "../components/master/bank";
import Reason from "../components/master/reason";
import CopyConfirm from "../components/master/copyConfirm";
import Commission from "../components/master/commission";
import Operator from "../components/master/operator";
import District from "../components/master/district";
import States from "../components/master/states";
import Transaction from "../pages/transaction";
import ProcessPage from "../pages/process";
import EditIssue from "../pages/process/editProcessPage";
import ReceiptsPage from "../pages/receipts";

export const routerData = [
  {
    path: pageRoutes.login,
    exact: false,
    layOut: false,
    element: <Login />
  },
  {
    path: pageRoutes.passwordReset,
    exact: false,
    layOut: false,
    element: <PasswordReset />
  },
  {
    path: pageRoutes.register,
    exact: false,
    layOut: false,
    element: <Register />
  },
  {
    path: '/master',
    exact: false,
    layOut: true,
    element: <DashBoard />
  },
  {
    path: '/agent',
    exact: false,
    layOut: true,
    element: <AgentCreation />
  },
  {
    path: '/magazine',
    exact: false,
    layOut: true,
    element: <Magazine />
  },
  {
    path: '/bank',
    exact: false,
    layOut: true,
    element: <Bank />
  },
  {
    path: '/reason',
    exact: false,
    layOut: true,
    element: <Reason />
  },
  {
    path: '/copyConfirm',
    exact: false,
    layOut: true,
    element: <CopyConfirm />
  },
  {
    path: '/commission',
    exact: false,
    layOut: true,
    element: <Commission />
  },
  {
    path: '/operator',
    exact: false,
    layOut: true,
    element: <Operator />
  },
  {
    path: '/districts',
    exact: false,
    layOut: true,
    element: <District />
  },
  {
    path: '/states',
    exact: false,
    layOut: true,
    element: <States />
  },
  {
    path: '/transaction',
    exact: false,
    layOut: true,
    element: <Transaction />
  },
  {
    path: '/processIssue',
    exact: false,
    layOut: true,
    element: <ProcessPage />
  },
  {
    path: '/receipts',
    exact: false,
    layOut: true,
    element: <ReceiptsPage />
  },
  {
    path: '/editIssue',
    exact: false,
    layOut: true,
    element: <EditIssue />
  },
  {
    path: pageRoutes.home,
    exact: false,
    layOut: true,
    element: <Home />
  },
  {
    path: pageRoutes.profile,
    exact: false,
    layOut: true,
    element: <Profile />
  },
  {
    path: pageRoutes.users,
    exact: false,
    layOut: true,
    element: <UsersList />
  },
  {
    path: pageRoutes.pageNotFound,
    exact: false,
    layOut: false,
    element: <PageNotFound />
  }
]