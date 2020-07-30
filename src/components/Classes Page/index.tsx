import React, { useState, useEffect } from "react";

// import { Switch, Route } from "react-router-dom";

import "./index.css";
import { getUserData, getLoggedIn, getClassData } from "../../utils/helpers";
import { Class } from "../../utils/interfaces";

const GetTableOfClasses = async (
  classes: Array<number>
): Promise<JSX.Element> => {
  if (!classes.length)
    return <h1>Looks like you don't participate in any classes.</h1>;

  const allClasses: Array<Class> = await Promise.all(
    classes.map((value) => {
      return getClassData(value);
    })
  );
  const allTeachers = await Promise.all(
    allClasses.map((value) => {
      return getUserData(value.teacher);
    })
  );

  const List = await Promise.all(
    allClasses.map(async (value, index) => {
      return (
        <tr
          className="listItemWrapper"
          key={index + "class" + value.name}
          onClick={() => {
            window.location.replace("#/classes/" + value.id);
          }}
        >
          <td>{value.id}</td>
          <td>{value.name}</td>
          <td>{allTeachers[index].name}</td>
          <td>{value.students.length}</td>
        </tr>
      );
    })
  );
  return (
    <table className="classesTable" key="loadedClasses">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Teacher</th>
          <th>Class Size</th>
        </tr>
      </thead>
      <tbody>{List}</tbody>
    </table>
  );
};

export default () => {
  const [userData, setUserData] = useState<any>({});
  const [isLogged, setIsLogged] = useState(false);
  const [allClasses, setAllClasses] = useState<JSX.Element>(
    <table key="defaultClassesTable" className="classesTable"></table>
  );

  const UpdateIsLogged = async () => {
    setIsLogged(await getLoggedIn());
  };
  const Update = async () => {
    const userData = await getUserData();
    setUserData(userData);
    setAllClasses(await GetTableOfClasses(userData.classes));
  };

  useEffect(() => {
    Update();
    UpdateIsLogged();
  }, [userData.id, allClasses.key]);

  return (
    <>
      {isLogged ? (
        <div className="classesWrapper">
          <div className="profileCreateClass">
            <div className="userName">{userData.name}</div>
            <div className="additionalClassesinfo">
              Total classes: {userData.classes.length}
            </div>
            {userData.role === "Teacher" || userData.role === "Admin" ? (
              <div className="createNewClass">
                <div className="instead">
                  <button>Create New Class</button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="allClasses">
            <h1>Your classes:</h1>
            {allClasses}
          </div>
        </div>
      ) : (
        <h1>You need to be logged in to see this page.</h1>
      )}
    </>
  );
};
