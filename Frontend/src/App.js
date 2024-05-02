import React from "react";
import routes from "./routes/routes";


import "react-loading-skeleton/dist/skeleton.css";
import "./styles/styles.scss";


const App = () => {

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
