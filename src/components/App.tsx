import React from "react";

import "./App.css";
import { NavBar } from "./common/Navigation Bar/index";
import LoginRegister from "./LoginRegister Page/index";
import Classes from "./Classes Page/index";

import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "./Home Page";

const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>
        <Route path="/loginRegister">
          <LoginRegister></LoginRegister>
        </Route>
        <Route path="/classes">
          <Classes></Classes>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
