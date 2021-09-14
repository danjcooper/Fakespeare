import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CreateRoomForm } from '../../Components';
import io from 'socket.io-client';

const Game = (Props) => {
  const socketServer = 'https://fakespeare-socket.herokuapp.com/';
  const location = useLocation();
  const [userName, setUserName] = useState(location.state.username);
  const [roomCode, setRoomCode] = useState(location.state.roomCode);
  const [owner, setOwner] = useState(location.state.roomOwner);
  //   let location = useLocation();
  const socket = io.connect(socketServer);

  useEffect(() => {
    const socket = io.connect(socketServer);
    socket.emit('joinRoom', { roomName: roomCode, username: userName });
  }, []);

  useEffect(() => {
    const socket = io.connect(socketServer);
    socket.on('newPlayer', () => {
      console.log('hi');
    });
  }, []);

  return (
    <>
      <h1>Game-Page</h1>
      <section>
        <h2>{roomCode}</h2>
      </section>
      <section>
        <h3>Players</h3>
        <p>{userName}</p>
      </section>
    </>
  );
};

export default Game;
