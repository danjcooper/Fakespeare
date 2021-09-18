import React from 'react';

const GameAnswerSubmit = ({ bookInfo, handleSubmit }) => {
  return (
    <section>
      <p className='book-title'>
        {bookInfo.title}
        <br />
        <span className='author'>{bookInfo.author}</span>
        <br />
        <span className='blurb'>{bookInfo.blurb}</span>
      </p>
      {bookInfo.question === 'first_line' ? (
        <h2>Make up the first Line</h2>
      ) : (
        <h2>Make up the last Line</h2>
      )}

      <form onSubmit={handleSubmit}>
        <textarea id='answer' type='text' placeholder='Answer here' />
        <button type='submit'>Submit</button>
      </form>
    </section>
  );
};

export default GameAnswerSubmit;
