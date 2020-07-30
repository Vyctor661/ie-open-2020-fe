import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";

import "./index.css";
import { getLoggedIn, joinClassByCode } from "../../utils/helpers";

export default () => {
  const { code } = useParams();
  const [isLogged, setIsLogged] = useState(false);
  const [joinResp, setJoinResp] = useState("");
  const UpdateIsLogged = async () => {
    const loggedIn = await getLoggedIn();
    if (loggedIn) {
      const resp: string = (await joinClassByCode(code)).toString();
      setJoinResp(resp);
    }
    setIsLogged(loggedIn);
  };
  useEffect(() => {
    UpdateIsLogged();
  });
  return (
    <>
      {isLogged ? (
        <>
          <h1>Joining class...</h1>
          {joinResp === "Successfully joined class" ? (
            <Redirect to="/classes"></Redirect>
          ) : (
            <h2>{joinResp}</h2>
          )}
        </>
      ) : (
        <h1>You need to be logged in to see this page. {code}</h1>
      )}
    </>
  );
};
