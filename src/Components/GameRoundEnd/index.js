import React from 'react';

const GameRoundEnd = ({ answers, advanceGame }) => {
  return (
    <section>
      {answers.map((answer, i) => {
        return (
          <article key={i}>
            <h2>{answer.answer}</h2>
            <p>
              written by <strong>{answer.userName}</strong>
            </p>
            <p>They fooled</p>
            <h3>{answer.selectedBy}</h3>
          </article>
        );
      })}
      <button onClick={advanceGame}>continue</button>
    </section>
  );
};

export default GameRoundEnd;
