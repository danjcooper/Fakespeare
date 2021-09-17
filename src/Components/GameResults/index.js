import React from 'react';

const GameResults = ({ results, nextRound }) => {
  return (
    <>
      <h1>results</h1>
      {results.map((player, i) => {
        return (
          <article key={i}>
            <p>{player.userName}</p>
            <p>{player.points}</p>
          </article>
        );
      })}
      <button onClick={nextRound}>Next Round</button>
    </>
  );
};

export default GameResults;
