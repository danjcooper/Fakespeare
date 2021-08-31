import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinRoomForm = () => {
  const [formData, setFormData] = useState({ username: '', roomCode: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleFormUpdate = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleFormUpdate}
        type='text'
        id='username'
        placeholder='username'
        value={formData.username}
        required
      />
      <input
        onChange={handleFormUpdate}
        type='text'
        id='roomCode'
        placeholder='roomcode'
        value={formData.roomCode}
        required
      />
      <button type='submit'>Join!</button>
      <Link to='/create'>Create a room</Link>
    </form>
  );
};

export default JoinRoomForm;
