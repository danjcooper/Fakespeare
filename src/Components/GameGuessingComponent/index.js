import React, { useState, useEffect } from 'react';

const GameGuessingComponent = ({
  answers,
  handleGuessSubmit,
  correctAnswer,
}) => {
  const [answerList, setAnswerList] = useState(answers);

  useEffect(() => {
    setAnswerList((prevState) => {
      const newArr = prevState.slice(0);

      let cAnswer =
        correctAnswer.question === 'first_line'
          ? correctAnswer.first_line
          : correctAnswer.last_line;

      let testA = { answer: cAnswer, userName: 'correct' };
      let index = Math.floor(Math.random() * answers.length);

      newArr.splice(index, 0, testA);

      return newArr;
    });
  }, []);

  return (
    <>
      <h1>which answer is right?</h1>
      <form onSubmit={handleGuessSubmit}>
        <section>
          {answerList.map((item, i) => {
            return (
              <label key={i}>
                {item.answer}
                <input name='answer' type='radio' value={item.answer} />
                <br />
              </label>
            );
          })}
        </section>
        <button type='submit'>Submit Guess</button>
      </form>
    </>
  );
};

export default GameGuessingComponent;
