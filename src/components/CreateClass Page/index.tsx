import "./index.css";
import React, { useState, useRef, useEffect } from "react";
import { createClass, getLoggedIn } from "../../utils/helpers";

// check if user is logged in and teacher
// also get the class id from the link
export default () => {
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("");

  const statusDiv = useRef<HTMLDivElement>(document.createElement("div"));

  const UpdateIsLogged = async () => {
    setIsLogged(await getLoggedIn());
  };
  useEffect(() => {
    UpdateIsLogged();
  }, []);

  const submit = async () => {
    statusDiv.current.innerHTML = "";
    const status = await createClass(name);
    statusDiv.current.innerHTML = status;
  };

  return (
    <>
    {isLogged ? (<div>
      <div className="leForm">
        <h1>Add class page</h1>
        <label className="nameInput">
          <input
            className="nameInput"
            type="text"
            placeholder="Class name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
        </label>
          
        <button
          className="submitButton"
          onClick={() => {
            submit();
          }}
        >
          Create
        </button>
      </div>
      <div className="status" ref={statusDiv}>
        {" "}
      </div>
    </div>) : (<h1>You are not logged in!</h1>)}</>
  );
};
