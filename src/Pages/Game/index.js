import React, { useState, useEffect } from 'react';
import {
  GameAnswerSubmit,
  GameGuessingComponent,
  GameResults,
  GameRoundEnd,
} from '../../Components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import { PlayerList } from '../../Components';
import { socket } from '../../services/socket';

const Game = () => {
  const GAME_STATUS = {
    LOADING: 'loading',
    ANSWERING: 'answering',
    WAITING: 'waiting',
    GUESSING: 'guessing',
    ROUND_END: 'round end',
    GAME_END: 'game end',
    RESULTS: 'results',
  };

  const location = useLocation();
  const questions = ['last_line', 'first_line'];

  const [roomCode, setRoomCode] = useState(location.state.roomCode);
  const [owner, setOwner] = useState(location.state.owner);
  const [userName, setUserName] = useState(location.state.userName);
  const [playerList, setPlayerList] = useState(location.state.playerList);
  const [roundNumber, setRoundNumber] = useState(0);
  const [roundAnswers, setRoundAnswers] = useState([]);
  const [roundGuesses, setRoundGuesses] = useState([]);

  const [gameStatus, setGameStatus] = useState(GAME_STATUS.LOADING);
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
        setGameStatus(GAME_STATUS.ANSWERING);
      };

      playerList.forEach((player) => {
        const temp = {
          userName: player,
          points: 0,
        };

        setGameData((prevState) => {
          let newArr = prevState.slice(0);
          newArr.push(temp);
          return newArr;
        });
      });

      socket.on('answer', (data) => {
        if (owner) {
          setRoundAnswers((prevState) => {
            let temp = prevState.slice(0);
            temp.push({ userName: data.userName, answer: data.answer });
            return temp;
          });
        }
      });

      socket.on('submit guess', (data) => {
        if (owner) {
          setRoundGuesses((prevState) => {
            let newArr = prevState.slice(0);
            newArr.push({ userName: data.userName, guess: data.guess });
            return newArr;
          });
        }
      });

      loadBooks();
    }

    socket.on('book list', (bookList) => {
      if (!owner) {
        setBooks(bookList);
        setGameStatus(GAME_STATUS.ANSWERING);
      }
    });

    if (!owner) {
      socket.on('update roundAnswers', (answers) => {
        setRoundAnswers(answers);
      });
    }

    if (!owner) {
      socket.on('update gameData', (gameData) => {
        setGameData(gameData);
      });
    }

    socket.on('update status', (status) => {
      setGameStatus(status);
      if (status === GAME_STATUS.RESULTS) {
        setRoundAnswers([]);
        setRoundGuesses([]);
        setRoundNumber((prevState) => prevState + 1);
      }
    });
  }, []);

  useEffect(() => {
    if (
      roundAnswers.length === playerList.length &&
      !roundAnswers[0].selectedBy
    ) {
      // setRoundNumber((prevState) => prevState + 1);

      setGameStatus(GAME_STATUS.GUESSING);

      socket.emit('update roundAnswers', {
        roomCode: roomCode,
        answerList: roundAnswers,
      });

      socket.emit('update status', {
        roomCode: roomCode,
        status: GAME_STATUS.GUESSING,
      });
    }
  }, [roundAnswers]);

  useEffect(() => {
    if (roundGuesses.length === playerList.length) {
      // setRoundNumber((prevState) => prevState + 1);

      roundAnswers.push({
        userName: books[roundNumber].author,
        answer: books[roundNumber][books[roundNumber].question],
      });

      // Loop through each answer and see if anyone guessed it
      roundAnswers.forEach((answer) => {
        for (let i = 0; i < roundGuesses.length; i++) {
          if (answer.answer == roundGuesses[i].guess) {
            if (playerList.includes(answer.userName)) {
              for (let i = 0; i < gameData.length; i++) {
                if (gameData[i].userName === answer.userName) {
                  gameData[i].points++;
                  break;
                }
              }
            }
            answer.selectedBy
              ? answer.selectedBy.push(roundGuesses[i].userName)
              : (answer.selectedBy = [roundGuesses[i].userName]);
          }
        }

        if (!answer.selectedBy) {
          answer.selectedBy = 'nobody 😭';
        }
      });

      roundGuesses.forEach((guess) => {
        if (guess.guess === books[roundNumber][books[roundNumber].question]) {
          for (let i = 0; i < gameData.length; i++) {
            if (gameData[i].userName === guess.userName) {
              gameData[i].points++;
              break;
            }
          }
        }
      });

      socket.emit('update roundAnswers', {
        roomCode: roomCode,
        answerList: roundAnswers,
      });

      socket.emit('update gameData', {
        roomCode: roomCode,
        gameData: gameData,
      });

      setGameStatus(GAME_STATUS.ROUND_END);

      socket.emit('update status', {
        roomCode: roomCode,
        status: GAME_STATUS.ROUND_END,
      });
    }
  }, [roundGuesses]);

  useEffect(() => {
    socket.emit('book list', { roomCode: roomCode, bookList: books });
  }, [books]);

  const handleAnswer = (e) => {
    e.preventDefault();
    if (owner) {
      setRoundAnswers((prevState) => {
        let temp = prevState.slice(0);
        temp.push({ userName: userName, answer: e.target.answer.value });
        setGameStatus(GAME_STATUS.WAITING);
        return temp;
      });
    } else {
      socket.emit('answer', {
        roomCode: roomCode,
        userName: userName,
        answer: e.target.answer.value,
      });
      setGameStatus(GAME_STATUS.WAITING);
    }
  };

  const handleGuessSubmit = (e) => {
    e.preventDefault();

    if (owner) {
      setRoundGuesses((prevState) => {
        const newArr = prevState.slice(0);
        newArr.push({ userName: userName, guess: e.target.answer.value });
        setGameStatus(GAME_STATUS.WAITING);
        return newArr;
      });
    }

    socket.emit('submit guess', {
      roomCode: roomCode,
      userName: userName,
      guess: e.target.answer.value,
    });
    setGameStatus(GAME_STATUS.WAITING);
  };

  const renderResultsComponent = () => {
    setGameStatus(GAME_STATUS.RESULTS);
    setRoundAnswers([]);
    setRoundGuesses([]);
    setRoundNumber((prevState) => prevState + 1);
    socket.emit('update status', {
      roomCode: roomCode,
      status: GAME_STATUS.RESULTS,
    });
  };

  const renderNextRound = () => {
    if (roundNumber >= books.length) {
      setGameStatus(GAME_STATUS.GAME_END);
      socket.emit('update status', {
        roomCode: roomCode,
        status: GAME_STATUS.GAME_END,
      });
    } else {
      setGameStatus(GAME_STATUS.ANSWERING);
      socket.emit('update status', {
        roomCode: roomCode,
        status: GAME_STATUS.ANSWERING,
      });
    }
  };

  const selectRenderComponment = () => {
    switch (gameStatus) {
      case GAME_STATUS.LOADING:
        return <h1>Loading</h1>;

      case GAME_STATUS.ANSWERING:
        return books.length > 0 ? (
          <GameAnswerSubmit
            bookInfo={books[roundNumber]}
            handleSubmit={handleAnswer}
          />
        ) : (
          <h1>loading</h1>
        );

      case GAME_STATUS.GUESSING:
        return roundAnswers.length > 0 ? (
          <GameGuessingComponent
            handleGuessSubmit={handleGuessSubmit}
            answers={roundAnswers}
            correctAnswer={books[roundNumber]}
          />
        ) : (
          <h1>loading</h1>
        );

      case GAME_STATUS.WAITING:
        return (
          <h1>
            waiting for others to submit their answers <br />
            Library notes on the book go here
          </h1>
        );

      case GAME_STATUS.ROUND_END:
        return roundAnswers[0].selectedBy ? (
          <GameRoundEnd
            answers={roundAnswers}
            advanceGame={renderResultsComponent}
          />
        ) : (
          <h1>loading</h1>
        );

      case GAME_STATUS.RESULTS:
        return roundAnswers ? (
          <GameResults results={gameData} nextRound={renderNextRound} />
        ) : (
          <h1>loading</h1>
        );

      case GAME_STATUS.GAME_END:
        return <h1>Game End</h1>;

      default:
        return <h1>Default</h1>;
    }
  };

  return <main>{selectRenderComponment()}</main>;
};

export default Game;
