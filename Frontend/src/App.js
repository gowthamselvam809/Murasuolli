import React, { useEffect } from "react";
import routes from "./routes/routes";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { getNotification } from "./reduxToolkit/features/notificationSlice";

import "react-loading-skeleton/dist/skeleton.css";
import "./styles/styles.scss";

const socket = io.connect("http://localhost:3004");

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on("chat", async (msg) => {
      console.log({ msg });
      dispatch(getNotification(msg))
    });
    return () => {
      socket.off("chat");
    };
  })

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
