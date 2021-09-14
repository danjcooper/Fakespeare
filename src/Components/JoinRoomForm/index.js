import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const JoinRoomForm = ({ toggleLogin }) => {
  const [formData, setFormData] = useState({ username: '', roomCode: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFormUpdate = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  };

  return (
    <>
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
      <button onClick={toggleLogin}>Create a Room</button>

      {submitted === true ? (
        <Redirect
          to={{
            pathname: '/lobby',
            state: {
              username: formData.username,
              roomCode: formData.roomCode.toUpperCase(),
              roomOwner: false,
            },
          }}
        />
      ) : null}
    </>
  );
};

export default JoinRoomForm;
