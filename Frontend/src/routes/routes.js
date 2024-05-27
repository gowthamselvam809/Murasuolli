
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routerData } from "./routesPath";
import { Layout } from "../components/common";
import { Login } from "./pages";
import PrivateRoute from "./privateRoute";

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      {
        routerData?.map((router, i) =>
          <Route path={router.path}
            element={<PrivateRoute
              element={router.element}
              layOut={router.layOut}
            />}
            // element={router?.layOut ? <Layout>{router.element}</Layout> : router.element}
            exact={router.exact}
            key={i}
          />)
      }
    </Routes>
  </BrowserRouter>
);

export default routes;