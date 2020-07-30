import React from "react";
import "./index.css";

export default () => {
  return (
    <div className="outerBox">
      <form>
        <div className="container">
          <label>
            Username
            <input type="text" placeholder="Enter Username" required></input>
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter Password"
              required
            ></input>
          </label>

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
