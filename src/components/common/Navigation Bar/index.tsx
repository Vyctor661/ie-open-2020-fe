import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Logo from "../logo/index";

import "./index.css";

import { getLoggedIn, logout } from "../../../utils/helpers";

const GetLoginProfile = (props: { isLogged: boolean }) => {
  if (props.isLogged) {
    return (
      <>
        {" "}
        <li>
          <Link to="/classes">Classes</Link>
        </li>
        <li className="login">
          <Link
            to="/"
            onClick={() => {
              logout();
            }}
          >
            Logout
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
  const [isLogged, setIsLogged] = useState(false);
  const updateIsLogged = async () => {
    setIsLogged(await getLoggedIn());
  };
  useEffect(() => {
    updateIsLogged();
  }, []);

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
        <GetLoginProfile isLogged={isLogged}></GetLoginProfile>
      </ul>
    </div>
  );
};
