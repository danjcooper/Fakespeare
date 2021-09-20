import React, { useState, useEffect } from 'react';

const GameResults = ({ results, nextRound }) => {
  const sortResultsByScore = () => {
    results.sort((a, b) => (a.points < b.points ? 1 : -1));
    console.log(results);
    return results;
  };

  const [displayResults, setDisplayResults] = useState(sortResultsByScore());
  useEffect(() => {
    sortResultsByScore();
  }, [displayResults]);

  return (
    <>
      <h1>RESULTS</h1>
      <table>
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
        {displayResults.map((player, i) => {
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
