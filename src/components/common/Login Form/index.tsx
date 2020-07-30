import React, { useState, useRef } from "react";
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
            Username
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            ></input>
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter password"
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
      <div className="status" ref={statusDiv}>
        {" "}
      </div>
    </div>
  );
};

