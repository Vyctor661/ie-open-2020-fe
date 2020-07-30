import "./index.css";
import React from "react";
import Logo from "../common/logo/index";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default () => {
  const { height, width } = useWindowDimensions();

  const displayedHeight = width > 400 ? 400 : width * 0.9;

  return (
    <div className="home">
      <div className="center">
        <span className="mainLogo">
          <Logo
            height="400"
            width={displayedHeight.toString()}
            viewBox="0 0 512 512"
          ></Logo>
        </span>
        <div className="description">
          <h1 className="mainWord">Booked</h1>
          <p className="secondaryWord">
            A simple, easy-to-use platform for ensuring your students are
            focused while studying.
          </p>
        </div>
        <div className="joinNowButton">
          <Link to="/loginRegister/register">
            <button>Join now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
