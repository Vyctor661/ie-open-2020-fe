import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import "./index.css";
import {
  getUserData,
  getLoggedIn,
  getClassData,
  getClassHWData,
  sendWebsocket,
} from "../../utils/helpers";
import { Class, Homework, User } from "../../utils/interfaces";

import { setWsHeartbeat } from "ws-heartbeat/client";

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
      {userData.role === "Teacher" ? (
        <h3 className="classesUserHwPannel">Code: {classData.code}</h3>
      ) : (
        ""
      )}
    </div>
  );
};

const ClassHomework = (props: { classid: string }) => {
  const [hwData, setHwData] = useState<Homework[]>([]);
  const [userData, setUserData] = useState<any>({});

  const Update = async () => {
    const userData = await getUserData();
    const hwData = await getClassHWData(props.classid);
    setHwData(hwData);
    setUserData(userData);
  };
  useEffect(() => {
    Update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.classid]);
  return (
    <div>
      <h1>Homework</h1>
      <div className="homeworkList">
        {hwData.map((l: Homework) => (
          <div key={l.name + l.id} className="homeworkListLink">
            <Link to={`/homework/${l.id}`}>
              <h3 className="classesUserHwPannel" key={l.id + l.name}>
                {l.name}
              </h3>
            </Link>
          </div>
        ))}
      </div>
      {userData.role === "Teacher" ? (
        <div>
          <Link to={`/addHomework/${props.classid}`}>
            <button className="addHomeworkButton">Add homework</button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const MessageToChat = (props: {
  data: {
    id: number;
    author: string;
    message: string;
    time: string;
  };
}) => {
  return (
    <div className="chatMessage" key={props.data.id + props.data.message}>
      {new Date(Number(props.data.time)).toString()} - {props.data.author} -{" "}
      {props.data.message}
    </div>
  );
};

const ClassChat = (props: { ws: WebSocket; classid: string }) => {
  const [chat, setChat] = useState<Array<JSX.Element>>([
    <div key="defaultChatKey"></div>,
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    if (props.ws) {
      props.ws.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        const { category, data } = parsedData;
        console.log(`Received a message of category ${category}`, data);
        if (category === "ping") {
          return;
        }
        if (category === "messageList") {
          setChat(
            data.map(
              (l: {
                id: number;
                author: string;
                message: string;
                time: string;
              }) => <MessageToChat data={l}></MessageToChat>
            )
          );
        }
        if (category === "newMessage") {
          setChat(
            [...chat, <MessageToChat data={data}></MessageToChat>]
          );
        }
      };
    }
  }, [props.ws]);

  useEffect(() => {
    if (props.ws) {
      sendWebsocket(props.ws, "loginClass", {
        id: localStorage.getItem("userid"),
        classid: props.classid,
      });

      sendWebsocket(props.ws, "getMessages", {
        id: localStorage.getItem("userid"),
        classid: props.classid,
      });
    }
  }, [props.ws, props.classid]);

  return (
    <div>
      <form className="chatForm">
        <div className="areaChat">{chat}</div>
        <input
          type="text"
          className="inputChat"
          placeholder="Press enter to send message!"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.which === 13) {
              console.log("Sent!");

              sendWebsocket(props.ws, "newMessage", {
                id: localStorage.getItem("userid"),
                message: chatInput,
                classid: props.classid,
              });
              setChatInput("");
            }
          }}
          value={chatInput}
        />
      </form>
    </div>
  );
};

const generateListOfParticipants = async (data: Array<User>) => {
  const list = await Promise.all(
    data.map((value, index) => {
      return (
        <div
          key={index + value.name}
          style={
            value.studentStatus === "online"
              ? { color: "#4caf50" }
              : value.studentStatus === "idle"
              ? { color: "#4caf50" }
              : { color: "lightgray" }
          }
        >
          {value.name}
        </div>
      );
    })
  );
  return list;
};

const getAllParticipantUsers = async (classid: string) => {
  const classData = await getClassData(classid);
  const participants = await Promise.all(
    classData.students.map((id) => {
      const userData = getUserData(id);
      return userData;
    })
  );

  return participants;
};

const ClassParticipants = () => {
  const [participants, setParticipants] = useState<Array<JSX.Element>>([
    <div key="defaultParticipants"></div>,
  ]);

  const { id } = useParams();

  const UpdateParticipants = async () => {
    const participants = await getAllParticipantUsers(id);
    setParticipants(await generateListOfParticipants(participants));
  };
  useEffect(() => {
    UpdateParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h2>Participants</h2>
      {participants}
    </div>
  );
};

export default () => {
  const [isLogged, setIsLogged] = useState(false);
  const ws = new WebSocket("ws://localhost:8090");

  const UpdateIsLogged = async () => {
    setIsLogged(await getLoggedIn());
  };

  const { id } = useParams();

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected");
    };
    ws.onclose = () => {
      console.log("Disconnected");
    };
    setWsHeartbeat(ws, '{"category": "ping"}');
    UpdateIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <ClassChat classid={id} ws={ws}></ClassChat>
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
