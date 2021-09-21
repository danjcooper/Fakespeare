import React, { useState, useEffect } from 'react';

const BookRoulette = () => {
  const [bookCoverUrls, setBookCoverUrls] = useState([
    '1Q84',
    'Clockwork Orange',
    'The Old Man & the Sea',
    'Beloved',
    'The Lord of the Rings',
  ]);
  const [currentBook, setCurrentBook] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let test;
    if (count < 60) {
      test = setTimeout(() => {
        console.log('hey');

        setCurrentBook((prevState) => {
          return prevState < bookCoverUrls.length ? prevState + 1 : 0;
        });
        setCount((prevState) => prevState + 1);
      }, 100);
    } else {
      clearInterval(test);
    }

    // setCurrentBook((prevState) => prevState + 1);

    // return () => clearInterval(goThroughCovers);
  }, [count]);

  return (
    <>
      <h1 id='test'>{bookCoverUrls[currentBook]}</h1>
    </>
  );
};

export default BookRoulette;
