import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
const helpers = require('../../helpers');

const CreateRoomForm = ({ toggleLogin }) => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoomCode(generateRoomCode());
    setSubmitted(true);
  };

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
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleNameChange}
          type='text'
          placeholder='name'
          value={name}
          required
        />
        <button type='submit'>Start!</button>
      </form>
      <button onClick={toggleLogin}>Join a Room</button>
      {submitted === true ? (
        <Redirect
          to={{
            pathname: '/lobby',
            state: { username: name, roomCode: roomCode, roomOwner: true },
          }}
        />
      ) : null}
    </>
  );
};

export default CreateRoomForm;
