import React, { useState, useEffect } from 'react';

import { CountdownBar } from '..';

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
      <CountdownBar runWhenDone={nextRound} duration={5} />

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
    </>
  );
};

export default GameResults;
