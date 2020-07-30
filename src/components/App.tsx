import React from "react";

import "./App.css";
import { NavBar } from "./common/Navigation Bar/index";
import LoginRegister from "./LoginRegister/index";

import { HashRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          Home page here
        </Route>
        <Route path="/loginRegister">
          <LoginRegister></LoginRegister>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
