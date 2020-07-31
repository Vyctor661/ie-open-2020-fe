import "./index.css";
import React, { useEffect, useState, useRef } from "react";
import { getLoggedIn, createHW } from "../../utils/helpers";
import { useParams } from "react-router-dom";

// check if user is logged in and teacher
// also get the class id from the link
export default () => {
  const [isLogged, setIsLogged] = useState(false);
  const [questionType, setQuestionType] = useState("choice");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [correct, setCorrect] = useState("");
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
    const status = await createHW(id, name, questionType, [choice1, choice2, choice3, choice4], correct);
    statusDiv.current.innerHTML = status;
  };

  const { id } = useParams();

  return (
    <>
    {isLogged ? (<div>
      <div className="leForm">
        <h1>Add homework page</h1>
          <label className="nameInput">
            <input
              className="nameInput"
              type="text"
              placeholder="Homework name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            ></input>
          </label>

          <div className="fields">
          <select
            placeholder="Enter question type"
            value={questionType}
            onChange={(e) => {
              setQuestionType(e.target.value);
            }}
            required
          >
            <option value="choice">Multiple Choice</option>
            <option value="short">Short answer</option>
            <option value="essay">Long answer</option>
          </select>

          {questionType === "choice" && <div><label className="choiceInput">
            <input
              className="choiceInput"
              type="text"
              placeholder="Choice 1"
              value={choice1}
              onChange={(e) => {
                setChoice1(e.target.value);
              }}
            ></input>
          </label>

          <label className="choiceInput">
            <input
              className="choiceInput"
              type="text"
              placeholder="Choice 2"
              value={choice2}
              onChange={(e) => {
                setChoice2(e.target.value);
              }}
            ></input>
          </label>

          <label className="choiceInput">
            <input
              className="choiceInput"
              type="text"
              placeholder="Choice 3"
              value={choice3}
              onChange={(e) => {
                setChoice3(e.target.value);
              }}
            ></input>
          </label>

          <label className="choiceInput">
            <input
              className="choiceInput"
              type="text"
              placeholder="Choice 4"
              value={choice4}
              onChange={(e) => {
                setChoice4(e.target.value);
              }}
            ></input>
          </label></div>}

        {
          questionType !== "essay" && <label className="correctInput">
          <input
            className="correctInput"
            type="text"
            placeholder="Correct answer"
            value={correct}
            onChange={(e) => {
              setCorrect(e.target.value);
            }}
          ></input>
        </label>
        }
          
        <button
          className="submitButton"
          onClick={() => {
            submit();
          }}
        >
          Create
        </button>
      </div></div>
      <div className="status" ref={statusDiv}>
        {" "}
      </div>
    </div>) : (<h1>You are not logged in!</h1>)}</>
  );
};
