import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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
      <section id='timer-container'>
        <CountdownCircleTimer
          isPlaying
          duration={12}
          onComplete={nextRound}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
        >
          {({ elapsedTime }) => 'Next Round \n Starting'}
        </CountdownCircleTimer>
        {/* <button onClick={nextRound}>Next Round</button> */}
      </section>
    </>
  );
};

export default GameResults;
