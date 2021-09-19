import io from 'socket.io-client';
require('dotenv').config();

const socketUrl =
  process.env.REACT_APP_DEV === 'true'
    ? 'http://localhost:3000/'
    : 'https://fakespeare-socket.herokuapp.com/';

export const socket = io(socketUrl, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999,
});
