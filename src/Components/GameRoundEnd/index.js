import React from 'react';
import { CountdownBar } from '..';

const GameRoundEnd = ({ answers, advanceGame }) => {
  return (
    <section>
      {answers.map((answer, i) => {
        return (
          <article key={i}>
            <section className='written-by-container'>
              <p className='results-author'>
                Author: <span className='bolder'>{answer.userName}</span>
              </p>
            </section>
            <section className='results-answer-container'>
              <h2 className='results-answer'>{answer.answer}</h2>

              <section className='picked-by'>
                {answer.selectedBy.map((user, i) => (
                  <article className='picked-by-name' key={i}>
                    {user}
                  </article>
                ))}
              </section>
            </section>
          </article>
        );
      })}
      <CountdownBar runWhenDone={advanceGame} duration={10} />
      {/* <button onClick={advanceGame}>continue</button> */}
    </section>
  );
};

export default GameRoundEnd;
