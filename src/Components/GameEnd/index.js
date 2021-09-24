import React, { useState, useEffect } from 'react';

const GameEnd = ({ results }) => {
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
      <h1>Game Over!</h1>
      <h2>RESULTS</h2>
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
    </>
  );
};

export default GameEnd;
