// import React, { useState } from 'react';
// import questions from './Questions';
// import "../App.css";

// export default function Quiz() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showResults, setShowResults] = useState(false);

//   const optionClicked = () => {
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   return (
//     <div className="quiz-container">
//       {showResults ? (
//         <div className="quiz-contents">
//           <h2>Your Checklist</h2>
//         </div>
//       ) : (
//         <div className="quiz-contents">
//           <h2>Welcome to Doggy Dojo! Tell us a little about your dog.</h2>
//           <h3>{questions[currentQuestion].text}</h3>
//           <ul>
//             {questions[currentQuestion].options.map((option) => {
//               return (
//                 <li
//                   key={option.id}
//                   onClick={() => {
//                     optionClicked();
//                   }}
//                 >
//                   {option.text}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import questions from './Questions';
import { useMutation } from '@apollo/client';
import { ADD_DOG } from '../utils/mutations';
import Auth from '../utils/auth';

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [userFormData, setUserFormData] = useState({
    size: '',
    activity: '',
    training: '',
  });
  
  const user = Auth.getProfile()

  const [addDog, {error}] = useMutation(ADD_DOG);
  function handleAnswer(questionIndex, answerIndex) {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answerIndex,
    }));
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    console.log(value);
  };
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   console.log('Answers:', answers);
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData)
    try {
      const booty = await addDog({
        variables: {
          username: user.username,
          ...userFormData
        },
      });
     console.log(booty)
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
                      // checked={answers[index] === optionIndex}
                      // onChange={() => handleAnswer(index, optionIndex)}
                      onChange={handleInputChange}
                    />
                    {option.text}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={refreshPage} type="submit">Submit</button>
      </form>
      <h2>Selected Answers</h2>
      <ul>
        {Object.entries(answers).map(([questionIndex, answerIndex]) => (
          <li key={questionIndex}>
            {questions[questionIndex].text}:{' '}
            {questions[questionIndex].options[answerIndex].text}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Quiz;