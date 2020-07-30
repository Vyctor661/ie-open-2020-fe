import React, { useState, useRef } from "react";
import "./index.css";

import { login } from "../../../utils/helpers";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const statusDiv = useRef<HTMLDivElement>(document.createElement("div"));

  const submit = async () => {
    statusDiv.current.innerHTML = "";
    const status = await login(email, password);
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
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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
      <div className="status" ref={statusDiv}>
        {" "}
      </div>
    </div>
  );
};
