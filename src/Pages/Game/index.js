import React, { useState, useEffect } from 'react';
import { GameAnswerSubmit } from '../../Components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { PlayerList } from '../../Components';

const Game = () => {
  const location = useLocation();
  const questions = ['last_line', 'first_line'];
  const [roomCode, setRoomCode] = useState(location.state.roomCode);
  const [owner, setOwner] = useState(location.state.owner);
  const [playerList, setPlayerList] = useState(location.state.playerList);
  const [roundNumber, setRoundNumber] = useState(0);
  const [books, setBooks] = useState([]);
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    if (owner) {
      const loadBooks = async () => {
        const booksFromApi = await axios.get(
          'https://fakespeare-api.herokuapp.com/play/5'
        );

        booksFromApi.data.forEach((book) => {
          book.question = questions[Math.floor(Math.random() * 2)];
        });
        setBooks(booksFromApi.data);
      };

      playerList.forEach((player) => {
        const temp = {
          username: player,
          peopleFooled: 0,
          correctAnswers: 0,
          answers: [],
        };
        setGameData((prevState) => {
          let newArr = prevState.slice(0);
          newArr.push(temp);
          return newArr;
        });
      });

      loadBooks();
    }
  }, []);

  return (
    <>
      <h1>I am the game</h1>
      {books.length > 0 ? (
        <GameAnswerSubmit bookInfo={books[roundNumber]} />
      ) : null}
    </>
  );
};

export default Game;
