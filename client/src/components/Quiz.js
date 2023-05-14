import React, { useState } from "react";
import questions from "./Questions";
import { useMutation } from "@apollo/client";
import { ADD_DOG } from "../utils/mutations";
import Auth from "../utils/auth";

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [userFormData, setUserFormData] = useState({
    size: "",
    activity: "",
    training: "",
  });

  const user = Auth.getProfile();

  const [addDog, { error }] = useMutation(ADD_DOG);
  function handleAnswer(questionIndex, answerIndex) {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDog({
        variables: {
          username: user.username,
          ...userFormData,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <h2>{question.text}</h2>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={option.id}>
                  <label>
                    <input
                      type="radio"
                      name={question.name}
                      value={option.text}
                      onChange={handleInputChange}
                    />
                    {option.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={refreshPage} type="submit">
          Submit
        </button>
      </form>
      <h2>Selected Answers</h2>
      <ul>
        {Object.entries(answers).map(([questionIndex, answerIndex]) => (
          <li key={questionIndex}>
            {questions[questionIndex].text}:{" "}
            {questions[questionIndex].options[answerIndex].text}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Quiz;
