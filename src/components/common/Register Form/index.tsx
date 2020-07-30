import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";

import { register } from "../../../utils/helpers";

export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const statusDiv = useRef<HTMLDivElement>(document.createElement("div"));

  const submit = async () => {
    statusDiv.current.innerHTML = "";
    const status = await register(role, username, password);
    statusDiv.current.innerHTML = status;
  };

  return (
    <div className="outerBox">
      <form>
        <div className="container">
          <label>
            <select
              placeholder="Enter username"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              required
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </label>

          <label>
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
            Register
          </button>
        </div>
      </form>

      <div className="instead">
        <Link to="/loginregister/login">
          <button>Login instead</button>
        </Link>
      </div>
      <div className="status" ref={statusDiv}>
        {" "}
      </div>
    </div>
  );
};
