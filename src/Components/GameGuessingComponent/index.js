import React, { useState, useEffect } from 'react';

const GameGuessingComponent = ({
  answers,
  handleGuessSubmit,
  correctAnswer,
  userName,
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

  const changeBackground = (e) => {
    const answers = document.querySelectorAll('.answer-display');
    const answerArr = Array.from(answers);
    console.log(answerArr);
    console.log(e.target.closest('label'));
    answerArr.forEach((answer) => {
      answer.style.color = 'black';
      answer.style.fontWeight = '300';
      // answer.style.fontWeight = '300';
      // answer.style.color = 'black';
      // answer.style.background = 'rgb(219, 219, 219)';
    });
    e.target.closest('label').style.color = 'green';
    e.target.closest('label').style.fontWeight = '800';
    // e.target.style.fontWeight = '800';
    // e.target.style.color = 'white';
  };

  return (
    <>
      <h1>which answer is right?</h1>
      <form onSubmit={handleGuessSubmit}>
        {answerList.map((item, i) => {
          if (item.userName !== userName) {
            return (
              <>
                <label
                  className='answer-display'
                  onClick={changeBackground}
                  key={i}
                >
                  {item.answer}
                  <input name='answer' type='radio' value={item.answer} />
                  <br />
                </label>
                <hr />
              </>
            );
          }
        })}
        <button type='submit'>Submit Guess</button>
      </form>
    </>
  );
};

export default GameGuessingComponent;
