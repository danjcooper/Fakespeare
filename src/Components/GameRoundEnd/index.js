import React from 'react';

const GameRoundEnd = ({ answers, advanceGame }) => {
  const handleSelectedBy = (selectedBy) => {
    console.log(selectedBy);
  };

  return (
    <section>
      {answers.map((answer, i) => {
        return (
          <article class='results-answer-container' key={i}>
            <h2 className='results-answer'>{answer.answer}</h2>
            <p className='results-author'>written by {answer.userName}</p>
            <p className='results-fooled'>Picked By</p>
            <section className='picked-by'>
              {answer.selectedBy.map((user, i) => (
                <article className='picked-by-name' key={i}>
                  {user}
                </article>
              ))}
            </section>
          </article>
        );
      })}

      <button onClick={advanceGame}>continue</button>
    </section>
  );
};

export default GameRoundEnd;
