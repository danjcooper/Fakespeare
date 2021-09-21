import React, { useState, useEffect } from 'react';
import { CountdownBar } from '..';

const GameAnswerSubmit = ({ bookInfo, handleSubmit }) => {
  const [guess, setGuess] = useState('');

  const handleGuessInput = (e) => {
    let firstLetter = e.target.value.slice(0, 1);
    firstLetter = firstLetter.toUpperCase();
    let remainingString = e.target.value.slice(1);

    let result = firstLetter.concat(remainingString);

    setGuess(result);
  };

  useEffect(() => {
    const button = document.getElementById('submit-button');
    if (guess === '') {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }, [guess]);

  return (
    <section>
      <p className='book-title book-info-answering'>
        {bookInfo.title}
        <br />
        <span className='author'>{bookInfo.author}</span>
        <br />
        <span className='blurb'>{bookInfo.blurb}</span>
      </p>
      {bookInfo.question === 'first_line' ? (
        <h2 className='book-info-answering'>Make up the first line</h2>
      ) : (
        <h2 className='book-info-answering'>Make up the last line</h2>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleGuessInput}
          id='answer'
          placeholder='Answer here'
          value={guess}
        />
        <button id='submit-button' type='submit'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default GameAnswerSubmit;
