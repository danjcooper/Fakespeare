import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  const location = useLocation();
  const [roomCode, setRoomCode] = useState(location.state.roomCode);
  const [owner, setOwner] = useState(location.state.owner);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const booksFromApi = await axios.get(
        'https://fakespeare-api.herokuapp.com/play/5'
      );
      setBooks(booksFromApi.data);
    };
    loadBooks();
  }, []);

  return (
    <>
      <h1>I am the game</h1>
    </>
  );
};

export default Game;
