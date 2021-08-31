import React, { useState } from 'react';

const CreateRoomForm = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
