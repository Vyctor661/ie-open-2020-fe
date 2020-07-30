import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import "./index.css";
import {
  getUserData,
  getLoggedIn,
  getClassData,
  getClassHWData,
} from "../../utils/helpers";
import { Class, Homework } from "../../utils/interfaces";

const ClassSettings = (props: { classid: string }) => {
  const [userData, setUserData] = useState<any>({});
  const [teacherData, setTeacherData] = useState<any>({});
  const [classData, setClassData] = useState<Class>({
    code: "",
    id: -1,
    name: "",
    students: [],
    teacher: -1,
  });
  const Update = async () => {
    const userData = await getUserData();
    const classData = await getClassData(props.classid);
    const teacherData = await getUserData(classData.teacher);
    setClassData(classData);
    setUserData(userData);
    setTeacherData(teacherData);
    console.log(userData, classData, teacherData);
  };

  useEffect(() => {
    Update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.classid]);

  return (
    <div>
      <h2>{userData.name}</h2>
      <h3 className="classesUserHwPannel">Class: {classData.name}</h3>
      <h3 className="classesUserHwPannel">Class ID: {classData.id}</h3>
      <h3 className="classesUserHwPannel">
        Class Size: {classData.students.length}
      </h3>
      <h3 className="classesUserHwPannel">Seeing class as: {userData.role}</h3>
      <h3 className="classesUserHwPannel">Teacher: {teacherData.name}</h3>
      {userData.role === "Teacher" ? <h3>Code: {classData.code}</h3> : ""}
    </div>
  );
};

const ClassHomework = (props: { classid: string }) => {
  const [hwData, setHwData] = useState<Homework[]>([]);
  const Update = async () => {
    const hwData = await getClassHWData(props.classid);
    setHwData(hwData);
  };
  useEffect(() => {
    Update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.classid]);
  return (
    <div>
      <h1>Homework</h1>
      {hwData.map((l: Homework) => (
        <h3 className="classesUserHwPannel" key={l.id + l.name}>
          {l.name}
        </h3>
      ))}
    </div>
  );
};

const ClassChat = () => {
  return (
    <div>
      <h1>Pannel3</h1>
    </div>
  );
};

const ClassParticipants = () => {
  return (
    <div>
      <h1>Pannel4</h1>
    </div>
  );
};

export default () => {
  const [isLogged, setIsLogged] = useState(false);

  const UpdateIsLogged = async () => {
    setIsLogged(await getLoggedIn());
  };

  const { id } = useParams();

  useEffect(() => {
    UpdateIsLogged();
  }, []);

  return (
    <div className="ClassWrapper">
      {isLogged ? (
        <>
          <div className="SettingsHomework">
            <div className="classSettings">
              <ClassSettings classid={id}></ClassSettings>
            </div>
            <div className="classHomework">
              <ClassHomework classid={id}></ClassHomework>
            </div>
          </div>

          <div className="classChat">
            <ClassChat></ClassChat>
          </div>
          <div className="classParticipants">
            <ClassParticipants></ClassParticipants>
          </div>
        </>
      ) : (
        <h1>You need to be logged in to see this page.</h1>
      )}
    </div>
  );
};
