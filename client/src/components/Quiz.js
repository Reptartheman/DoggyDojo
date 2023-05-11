import React, { useState } from 'react';
import questions from './Questions';
import "../App.css";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const optionClicked = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div className="quiz-container">
      {showResults ? (
        <div className="quiz-contents">
          <h2>Your Checklist</h2>
        </div>
      ) : (
        <div className="quiz-contents">
          <h2>Welcome to Doggy Dojo! Tell us a little about your dog.</h2>
          <h3>{questions[currentQuestion].text}</h3>
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => {
                    optionClicked();
                  }}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
