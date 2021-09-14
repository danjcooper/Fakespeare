import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CreateRoomForm } from '../../Components';

const Game = (Props) => {
  const location = useLocation();
  const [userName, setUserName] = useState(location.state.username);
  const [roomCode, setRoomCode] = useState(location.state.roomCode);
  //   let location = useLocation();
  return (
    <>
      <h1>Game-Page</h1>
      {console.log(location.state.roomCode)}
    </>
  );
};

export default Game;
