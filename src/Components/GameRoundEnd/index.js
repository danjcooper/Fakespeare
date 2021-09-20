import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const GameRoundEnd = ({ answers, advanceGame }) => {
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
      <section id='timer-container'>
        <CountdownCircleTimer
          isPlaying
          duration={15}
          size={140}
          onComplete={advanceGame}
          colors={[
            ['#3246a8', 0.5],
            ['#32a879', 0.5],
          ]}
        >
          {({ elapsedTime }) => 'Scores'}
        </CountdownCircleTimer>
        {/* <button onClick={nextRound}>Next Round</button> */}
      </section>
      {/* <button onClick={advanceGame}>continue</button> */}
    </section>
  );
};

export default GameRoundEnd;
