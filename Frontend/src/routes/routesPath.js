
import React from "react";

import { Login, Home, PageNotFound, DashBoard, Register, Profile, PasswordReset, UsersList } from "./pages";
import { pageRoutes } from "../helper";

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
    path: pageRoutes.dashboard,
    exact: false,
    layOut: true,
    element: <DashBoard />
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