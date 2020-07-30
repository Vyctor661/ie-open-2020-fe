import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import { login } from "../../../utils/helpers";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const statusDiv = useRef<HTMLDivElement>(document.createElement("div"));

  const submit = async () => {
    statusDiv.current.innerHTML = "";
    const status = await login(username, password);
    statusDiv.current.innerHTML = status;
  };

  return (
    <div className="outerBox">
      <form>
        <div className="container">
          <label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            ></input>
          </label>

          <label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password"
              required
            ></input>
          </label>
          <button
            onClick={() => {
              submit();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div className="instead">
        <Link to="/loginregister/register">
          <button>Register instead</button>
        </Link>
      </div>{" "}
      <div className="status" ref={statusDiv}>
        {" "}
      </div>
    </div>
  );
};
