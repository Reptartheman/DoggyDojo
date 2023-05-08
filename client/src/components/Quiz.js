import React, { useState } from 'react';
import questions from './Questions';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const answerClicked = () => {
    // TODO: Need to code some kind of logic for what happens when the user clickes on each answer (For example, if the user clicks on large dog, what happens?)

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // TODO: Need to code some kind of logic for what happens after all answers are clicked (The user should return to the Profile page and see the results of the quiz.) When this is done, be sure to delete the return below.
      return;
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-contents">
        <h2>Welcome to Doggy Dojo! Tell us a little about your dog.</h2>
        <h3>{questions[currentQuestion].text}</h3>
        <ul>
          {questions[currentQuestion].options.map((option) => {
            return (
              <li key={option.id} onClick={() => answerClicked()}>
                {option.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
