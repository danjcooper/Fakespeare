import React from 'react';

const GameAnswerSubmit = ({ bookInfo }) => {
  return (
    <section>
      <p>
        {bookInfo.title}
        <br />
        {bookInfo.author}
        <br />
        <span>{bookInfo.blurb}</span>
      </p>
      {bookInfo.question === 'first_line' ? (
        <h2>Make up the first Line</h2>
      ) : (
        <h2>Make up the last Line</h2>
      )}

      <form>
        <input type='text' />
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default GameAnswerSubmit;
