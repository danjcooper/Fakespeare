import React, { useState } from 'react';
import style from './style.module.css';

const GameGuessingComponent = ({ answers, handleGuessSubmit }) => {
  return (
    <>
      <h1>which answer is right?</h1>
      <form onSubmit={handleGuessSubmit}>
        <section>
          {answers.map((item, i) => {
            return (
              <label key={i}>
                {item.answer}
                <input name='answer' type='radio' value={item.answer} />
                <br />
              </label>
            );
          })}
        </section>
        <button type='submit'>Submit Guess</button>
      </form>
    </>
  );
};

export default GameGuessingComponent;
