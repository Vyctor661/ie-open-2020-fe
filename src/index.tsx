import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

if (!localStorage.getItem("userid"))
  localStorage.setItem("userid", "undefined");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
