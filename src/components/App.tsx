import React from "react";

import "./App.css";
import { NavBar } from "./common/Navigation Bar/index";
import LoginRegister from "./LoginRegister Page/index";
import Classes from "./Classes Page/index";
import HomePage from "./Home Page";
import IndividualClassPage from "./IndividualClass Page/index";
import JoinClassPage from "./JoinClass Page/index";
import SubmitHomeworkPage from "./SubmitHomework Page/index";
import AddHomeworkPage from "./AddHomework Page/index";
import CreateClassPage from "./CreateClass Page/index";
// import AllHomework from "./Allhomework Page/index";

import { HashRouter, Route, Switch } from "react-router-dom";

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
        <Route exact path="/classes">
          <Classes></Classes>
        </Route>
        <Route exact path="/classes/:id">
          <IndividualClassPage></IndividualClassPage>
        </Route>
        <Route exact path="/join/:code">
          <JoinClassPage></JoinClassPage>
        </Route>
        <Route exact path="/homework/:id">
          <SubmitHomeworkPage></SubmitHomeworkPage>
        </Route>
        <Route exact path="/addHomework/:id">
          <AddHomeworkPage></AddHomeworkPage>
        </Route>
        <Route exact path="/createClass">
          <CreateClassPage></CreateClassPage>
        </Route>
        {/* <Route exact path="/allhomework/:id">
          <AllHomework></AllHomework>
        </Route> */}
      </Switch>
    </HashRouter>
  );
};

export default App;
