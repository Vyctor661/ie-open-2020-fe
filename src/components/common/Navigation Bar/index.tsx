import React from "react";

import { Link } from "react-router-dom";

import Logo from "../logo/index";

import "./index.css";

import { getLoggedIn } from "../../../utils/helpers";

const GetLoginProfile = (props: { isLogged: boolean }) => {
  if (props.isLogged) {
    return (
      <>
        {" "}
        <li>
          <Link to="/classes">Classes</Link>
        </li>
        <li className="login">
          <Link to="/profile" hidden={false}>
            Profile
          </Link>
        </li>
      </>
    );
  } else {
    return (
      <li className="login">
        <Link to="/loginRegister/login">Login</Link>
      </li>
    );
  }
};

export const NavBar = () => {
  return (
    <div className="fix">
      <ul>
        <li className="homeLink">
          <Link to="/">
            <span className="fixsvg">
              <Logo height="20" width="30" viewBox="0 0 512 512"></Logo>
            </span>
            <span className="homeTitle">BOOKED</span>
          </Link>
        </li>
        <GetLoginProfile isLogged={getLoggedIn()}></GetLoginProfile>
      </ul>
    </div>
  );
};
