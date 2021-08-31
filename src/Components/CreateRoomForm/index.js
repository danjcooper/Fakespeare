import React, { useState } from 'react';
const helpers = require('../../helpers');

const CreateRoomForm = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const generateRoomCode = () => {
    const bank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let roomCode = '';
    for (let i = 0; i < 4; i++) {
      roomCode += bank[helpers.getRandom(bank.length - 1)];
    }

    // TODO check if code appears in lists of bad words, if it does run the function again.

    const tempBannedWords = ['SHIT', 'FUCK', 'DICK', 'CUNT'];

    if (tempBannedWords.includes(roomCode)) {
      generateRoomCode();
    }
    return roomCode;
  };
  return (
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
  );
};

export default CreateRoomForm;
