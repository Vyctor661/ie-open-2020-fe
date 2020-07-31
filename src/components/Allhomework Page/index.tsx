import React, { useState, useEffect } from "react";
import { Homework } from "../../utils/interfaces";

import { useParams } from "react-router-dom";

import "./index.css";

const allTeachers = (users: number[]) =>  await Promise.all(
    users.map(async (value) => {
      console.log(value);

        const userData = await getUserData(user);
        return userData;
    })
);

const generateHWList = async (hw: Array<Homework>) =>{
    const list = hw.map(async (value, index) => {
            return (
              <tr
                className="listItemWrapper"
                key={index + "class" + value.name}
                onClick={() => {
                  window.location.replace("#/classes/" + value.id);
                }}
              >
                <td>{value.name}</td> /// the username
                <td>{value.name}</td> /// the homework name 
                <td>{value.students.length}</td> /// the homework content
              </tr>
            );
          })
        );
        return (
          <table className="classesTable" key="loadedClasses">
            <thead>
              <tr>
                <th>Name</th>
                <th>Homework</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>{List}</tbody>
          </table>
        );

        return list
}

export default () => {
  const [generatedHwList, setGeneratedHwList] = useState<Array<JSX.Element>>([<div key="defaultKeyforhwlist"></div>])


  const Update = async ()=> {
      const list = 
  }

  const { id } = useParams();

  return (
    <>
      <h2>All class's homework. </h2>
      {id}
    </div>
  );
};
