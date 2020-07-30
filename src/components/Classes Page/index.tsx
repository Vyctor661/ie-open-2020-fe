import React, { useState, useEffect } from "react";

// import { Switch, Route } from "react-router-dom";

import "./index.css";
import { getUserData, getLoggedIn } from "../../utils/helpers";

export default () => {
  const [userData, setUserData] = useState<any>({});
  const [isLogged, setIsLogged] = useState(false);
  const updateIsLogged = async () => {
    setIsLogged(await getLoggedIn());
  };
  const UpdateUserData = async () => {
    setUserData(await getUserData());
  };

  useEffect(() => {
    UpdateUserData();
    updateIsLogged();
  }, [userData.role]);

  return (
    <>
      {isLogged ? (
        <div className="classesWrapper">
          <div className="profileCreateClass">
            <div className="userName">{userData.name}</div>
            {userData.role !== "Student" ? (
              <div className="createNewClass">
                <div className="instead">
                  <button>Create New Class</button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="allClasses"></div>
        </div>
      ) : (
        <h1>You need to be logged in to see this page.</h1>
      )}
    </>
  );
};
