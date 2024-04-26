
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routerData } from "./routesPath";
import { Layout } from "../components/common";

const routes = (
  <BrowserRouter>
    <Routes>
      {
        routerData?.map((router, i) => <Route path={router.path} element={router?.layOut ? <Layout>{router.element}</Layout> : router.element} exact={router.exact} key={i} />)
      }
    </Routes>
  </BrowserRouter>
);

export default routes;