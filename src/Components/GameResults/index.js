import React from 'react';

const GameResults = ({ results, nextRound }) => {
  return (
    <>
      <h1>RESULTS</h1>
      <table>
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
        {results.map((player, i) => {
          return (
            <tr key={i}>
              <td>{player.userName}</td>
              <td>{player.points}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={nextRound}>Next Round</button>
    </>
  );
};

export default GameResults;
