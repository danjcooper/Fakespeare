import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const JoinRoomForm = ({ toggleLogin }) => {
  const [formData, setFormData] = useState({ username: '', roomCode: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFormUpdate = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value.toUpperCase() };
    });
  };

  useEffect(() => {
    const button = document.getElementById('submit-button');
    if (formData.username === '' || formData.roomCode === '') {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }, [formData]);

  return (
    <main>
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
        <button id='submit-button' type='submit'>
          Join!
        </button>
      </form>
      <button className='switch' onClick={toggleLogin}>
        Create a Room
      </button>

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
    </main>
  );
};

export default JoinRoomForm;
