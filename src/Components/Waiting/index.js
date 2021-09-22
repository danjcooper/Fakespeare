import React, { useState, useEffect } from 'react';

const Waiting = ({ bookFacts }) => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  const parseBookFacts = () => {
    if (bookFacts.indexOf(':') === -1) {
      return [
        'Vince should have written notes for this book...',
        'He is lazy.',
      ];
    }
    const temp = bookFacts.split(/.:/g);
    temp.shift();
    return temp;
  };

  const [books, setBooks] = useState(parseBookFacts(bookFacts));

  useEffect(() => {
    let changeFact = setInterval(() => {
      setCurrentBookIndex((prevState) => {
        return prevState < books.length - 1 ? prevState + 1 : 0;
      });
      return () => {
        clearInterval(changeFact);
      };
    }, 2000);
  }, []);
  return (
    <main>
      <h1>waiting</h1>
      <p>{books[currentBookIndex]}</p>
    </main>
  );
};

export default Waiting;
