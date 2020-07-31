import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./index.css";
import { getLoggedIn, hwDataById } from "../../utils/helpers";
import { Homework, Question } from "../../utils/interfaces";

import { apiUrl } from "../../utils/constants";

// const invalidQuestion: Question = {
//   choices: [],
//   homeworkid: -1,
//   id: -1,
//   name: "",
//   type: "choice"
// }

const submit = async (homeworkid: string, answer: string) => {
  const result = await fetch(`${apiUrl}/homework/completeHW`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ homeworkid, choices: answer }),
  });
  console.log(await result.json());
};

const MultipleChoiceQuestion = (props: { question: Question }) => {
  const [question, setQuestion] = useState<Question>(props.question);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  useEffect(() => {
    setQuestion(props.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="multipleChoiceQuestion">
      <h5>Multiple choice answer</h5>

      <label className="multipleChoiceRadio">
        {props.question.choices[0]}
        <input
          type="radio"
          checked={checked1}
          onChange={(e) => {
            setChecked1(e.target.checked);
            setChecked2(!e.target.checked);
            setChecked3(!e.target.checked);
            setChecked4(!e.target.checked);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <br />
      <label className="multipleChoiceRadio">
        {question.choices[1]}

        <input
          type="radio"
          checked={checked2}
          onChange={(e) => {
            setChecked1(!e.target.checked);
            setChecked2(e.target.checked);
            setChecked3(!e.target.checked);
            setChecked4(!e.target.checked);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <br />
      <label className="multipleChoiceRadio">
        {question.choices[2]}

        <input
          type="radio"
          checked={checked3}
          onChange={(e) => {
            setChecked1(!e.target.checked);
            setChecked2(!e.target.checked);
            setChecked3(e.target.checked);
            setChecked4(!e.target.checked);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <br />
      <label className="multipleChoiceRadio">
        {question.choices[3]}

        <input
          type="radio"
          checked={checked4}
          onChange={(e) => {
            setChecked1(!e.target.checked);
            setChecked2(!e.target.checked);
            setChecked3(!e.target.checked);
            setChecked4(e.target.checked);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <div className="outerHwbutton">
        <button
          className="addHomeworkButton"
          onClick={() => {
            const answer = checked1
              ? question.choices[0]
              : checked2
              ? question.choices[1]
              : checked3
              ? question.choices[2]
              : question.choices[3];
            submit(question.homeworkid.toString(), answer);
          }}
        >
          Submit homework
        </button>
      </div>
    </div>
  );
};

const ShortAnswerQuestion = (props: { question: Question }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [question, setQuestion] = useState<Question>(props.question);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setQuestion(props.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="shortAnswerQuestion">
      <div className="shortAnswerInput">
        <label>
          <h5>Short answer</h5>

          <input
            type="text"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            required
            value={answer}
          />
        </label>
      </div>
      <div className="outerHwbutton">
        <button
          className="addHomeworkButton"
          onClick={() => {
            submit(question.homeworkid.toString(), answer);
          }}
        >
          Submit homework
        </button>
      </div>
    </div>
  );
};

const LongAnswerQuestion = (props: { question: Question }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [question, setQuestion] = useState<Question>(props.question);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    setQuestion(props.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="longAnswerQuestion">
      <div className="longAnswerTextarea">
        <label>
          <h5>Long answer</h5>

          <textarea
            placeholder="Type your answer here..."
            required
            rows={10}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          ></textarea>
        </label>
      </div>
      <div className="outerHwbutton">
        <button
          className="addHomeworkButton"
          onClick={() => {
            submit(question.homeworkid.toString(), answer);
          }}
        >
          Submit homework
        </button>
      </div>
    </div>
  );
};

export default () => {
  const { id } = useParams();
  const [isLogged, setIsLogged] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hwData, setHwData] = useState<Homework>({
    id: -1,
    classid: -1,
    dueDate: -1,
    name: "",
    question: {
      id: -1,
      choices: [],
      homeworkid: -1,
      name: "",
      type: "short",
    },
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<JSX.Element>(
    <></>
  );

  const UpdateIsLogged = async () => {
    const loggedIn = await getLoggedIn();

    if (loggedIn) {
      const resp = (await hwDataById(id)) as Homework;
      setHwData(resp);
      const question = await GenerateQuestions(resp.question, resp);
      console.log(resp);

      setGeneratedQuestions(question);
    }

    setIsLogged(loggedIn);
  };

  useEffect(() => {
    UpdateIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GenerateQuestions = async (data: Question, resp: Homework) => {
    if (!data) return <></>;
    return (
      <>
        <h3 className="QuestionTitle">{resp.name}</h3>
        {data.type === "choice" ? (
          <div className="individualQuestion">
            <MultipleChoiceQuestion question={data}></MultipleChoiceQuestion>
          </div>
        ) : data.type === "short" ? (
          <div className="individualQuestion">
            {<ShortAnswerQuestion question={data}></ShortAnswerQuestion>}
          </div>
        ) : (
          <div className="individualQuestion">
            {<LongAnswerQuestion question={data}></LongAnswerQuestion>}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {isLogged ? (
        <>
          <div className="questions">
            <h2>Answer</h2>
            <form>{generatedQuestions}</form>
          </div>
        </>
      ) : (
        <h1>You need to be logged in to see this page. </h1>
      )}
    </>
  );
};
