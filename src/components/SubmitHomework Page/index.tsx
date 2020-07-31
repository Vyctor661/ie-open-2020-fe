import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./index.css";
import { getLoggedIn, hwDataById } from "../../utils/helpers";
import { Homework, Question } from "../../utils/interfaces";

// const invalidQuestion: Question = {
//   choices: [],
//   homeworkid: -1,
//   id: -1,
//   name: "",
//   type: "choice"
// }

const MultipleChoiceQuestion = (props: { question: Question }) => {
  const [checked, setChecked] = useState(-1);
  const [question, setQuestion] = useState<Question>(props.question);

  useEffect(() => {
    setQuestion(props.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="multipleChoiceQuestion">
      <h2>{question.name}</h2>

      <label className="multipleChoiceRadio">
        {props.question.choices[0]}
        <input
          type="radio"
          checked={checked === 0}
          onChange={(e) => {
            if (e.target.checked) {
              setChecked(-1);
            } else setChecked(0);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <br />
      <label className="multipleChoiceRadio">
        {question.choices[1]}

        <input
          type="radio"
          checked={checked === 1}
          onChange={(e) => {
            if (e.target.checked) {
              setChecked(-1);
            } else setChecked(1);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <br />
      <label className="multipleChoiceRadio">
        {question.choices[2]}

        <input
          type="radio"
          checked={checked === 2}
          onChange={(e) => {
            if (e.target.checked) {
              setChecked(-1);
            } else setChecked(2);
          }}
        />
        <span className="checkmark"></span>
      </label>
      <br />
      <label className="multipleChoiceRadio">
        {question.choices[3]}

        <input
          type="radio"
          checked={checked === 3}
          onChange={(e) => {
            if (e.target.checked) {
              setChecked(-1);
            } else setChecked(3);
          }}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

const ShortAnswerQuestion = (props: { question: Question }) => {
  const [question, setQuestion] = useState<Question>(props.question);

  useEffect(() => {
    setQuestion(props.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="shortAnswerQuestion">
      <h2>{question.name}</h2>
      <div className="shortAnswerInput">
        <label>
          Short answer
          <input type="text" required />
        </label>
      </div>
    </div>
  );
};

const LongAnswerQuestion = (props: { question: Question }) => {
  const [question, setQuestion] = useState<Question>(props.question);
  useEffect(() => {
    setQuestion(props.question);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="longAnswerQuestion">
      <h2>{question.name}</h2>
      <div className="longAnswerTextarea">
        <label>
          Long answer
          <textarea
            placeholder="Type your answer here..."
            required
            rows={10}
          ></textarea>
        </label>
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
    questions: [],
  });
  const [generatedQuestions, setGeneratedQuestions] = useState<JSX.Element>(
    <></>
  );

  const UpdateIsLogged = async () => {
    const loggedIn = await getLoggedIn();

    if (loggedIn) {
      const resp = (await hwDataById(id)) as Homework;

      setHwData(resp);
      const question = await GenerateQuestions(resp.questions[0]);
      setGeneratedQuestions(question);
    }

    setIsLogged(loggedIn);
  };

  useEffect(() => {
    UpdateIsLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GenerateQuestions = async (data: Question) => {
    return data.type === "choice" ? (
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
    );
  };

  return (
    <>
      {isLogged ? (
        <>
          <div className="questions">
            <form>{generatedQuestions}</form>
          </div>
        </>
      ) : (
        <h1>You need to be logged in to see this page. </h1>
      )}
    </>
  );
};
