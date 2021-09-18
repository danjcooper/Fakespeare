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

  const changeBackground = (e) => {
    const answers = document.querySelectorAll('article.answer');
    const answerArr = Array.from(answers);

    answerArr.forEach((answer) => {
      answer.style.background = 'none';
      answer.style.fontWeight = '300';
      answer.style.color = 'black';
      answer.style.background = 'rgb(219, 219, 219)';
    });
    e.target.closest('article').style.background = '#eda92c';
    e.target.closest('article').style.fontWeight = '800';
    e.target.closest('article').style.color = 'white';
  };

  return (
    <>
      <h1>which answer is right?</h1>
      <form onSubmit={handleGuessSubmit}>
        <section>
          {answerList.map((item, i) => {
            return (
              <article onClick={changeBackground} className='answer'>
                <label onClick={changeBackground} key={i}>
                  {item.answer}
                  <input name='answer' type='radio' value={item.answer} />
                  <br />
                </label>
              </article>
            );
          })}
        </section>
        <button type='submit'>Submit Guess</button>
      </form>
    </>
  );
};

export default GameGuessingComponent;
