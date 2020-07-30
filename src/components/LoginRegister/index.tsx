import React from "react";

import { LoginPage, RegisterPage } from "../common/Login Form/index";
import { Switch, Route } from "react-router-dom";

export default () => (
  <Switch>
    <Route exact path="/loginRegister/register">
        <RegisterPage></RegisterPage>
    </Route>
    <Route exact path="/loginRegister/login">
        <LoginPage></LoginPage>
    </Route>
  </Switch>
)
