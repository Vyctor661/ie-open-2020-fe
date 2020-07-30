import React from "react";

import "./App.css";
import { NavBar } from "./common/Navigation Bar/index";
import LoginRegister from "./LoginRegister Page/index";
import Classes from "./Classes Page/index";

import { HashRouter, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          Home page here
        </Route>
        <Route exact path="/loginRegister">
          <LoginRegister></LoginRegister>
        </Route>
        <Route exact path="/classes">
          <Classes></Classes>
        </Route>
        <Route exact path="/classes/:id">
          some random class here
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
