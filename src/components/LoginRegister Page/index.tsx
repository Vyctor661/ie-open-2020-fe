import React from "react";

import LoginPage from "../common/Login Form/index";
import RegisterPage from "../common/Register Form/index";
import { Switch, Route } from "react-router-dom";

import Logo from "../common/logo/index";

import "./index.css";

export default () => {
  return (
    <>
      <div className="wrapper">
        <div className="innerWrapper">
          <div className="logoWrapper">
            <div className="logoNameButton">
              <div className="logo">
                <Logo height="250" width="200" viewBox="0 0 512 512"></Logo>
              </div>
              <div className="name">BOOKED</div>
            </div>
          </div>
          <div className="fromWrapper">
            <Switch>
              <Route exact path="/loginRegister/register">
                <RegisterPage></RegisterPage>
              </Route>
              <Route exact path="/loginRegister/login">
                <LoginPage></LoginPage>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};
