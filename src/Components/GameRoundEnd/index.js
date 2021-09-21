import React from 'react';
import { CountdownBar } from '..';

const GameRoundEnd = ({ answers, advanceGame }) => {
  return (
    <section>
      {answers.map((answer, i) => {
        return (
          <article className='results-answer-container' key={i}>
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
      <CountdownBar runWhenDone={advanceGame} duration={10} />
      <button onClick={advanceGame}>continue</button>
    </section>
  );
};

export default GameRoundEnd;
