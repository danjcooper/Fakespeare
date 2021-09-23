import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { CheekySpeare } from '..';
const helpers = require('../../helpers');

const CreateRoomForm = ({ toggleLogin }) => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [noOfBooks, setNnoOfBooks] = useState(5);

  const handleNameChange = (e) => {
    setName(e.target.value.toUpperCase());
  };

  const handleNumberChange = (e, operation) => {
    if (operation === '+' && noOfBooks + 1 <= 10) {
      setNnoOfBooks((prevState) => prevState + 1);
    } else if (operation === '-' && noOfBooks - 1 > 0) {
      setNnoOfBooks((prevState) => prevState - 1);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomCode(generateRoomCode());
    setSubmitted(true);
  };

  useEffect(() => {
    const button = document.getElementById('submit-button');
    if (name === '') {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }, [name]);

  const generateRoomCode = () => {
    const bank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let roomCode = '';
    for (let i = 0; i < 4; i++) {
      roomCode += bank[helpers.getRandom(bank.length - 1)];
    }

    const tempBannedWords = ['SHIT', 'FUCK', 'DICK', 'CUNT'];

    if (tempBannedWords.includes(roomCode)) {
      generateRoomCode();
    }
    return roomCode;
  };
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleNameChange}
          type='text'
          placeholder='name'
          value={name}
          required
        />
        <h2 className='close-head'>Rounds</h2>
        <section id='book-counter'>
          <button
            className='counter-button -'
            onClick={(e) => handleNumberChange(e, '-')}
            type='button'
          >
            -
          </button>
          <section className='counter-num'>{noOfBooks}</section>
          <button
            className='counter-button +'
            onClick={(e) => handleNumberChange(e, '+')}
            type='button'
          >
            +
          </button>
        </section>
        <button id='submit-button' type='submit'>
          Start!
        </button>
      </form>
      <button className='switch' onClick={toggleLogin}>
        Join a Room
      </button>
      {submitted === true ? (
        <Redirect
          to={{
            pathname: '/lobby',
            state: {
              username: name,
              roomCode: roomCode,
              roomOwner: true,
              noOfBooks: noOfBooks,
            },
          }}
        />
      ) : null}
      <CheekySpeare />
    </main>
  );
};

export default CreateRoomForm;
