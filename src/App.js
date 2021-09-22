import React, { useState } from 'react';
import {
  CreateRoomForm,
  JoinRoomForm,
  Nav,
  BookRoulette,
  CountdownBar,
  GameRoundEnd,
} from './Components';
import { Lobby, Game } from './Pages';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './style.css';

function App() {
  const [loginType, setLoginType] = useState('join');
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('join');

  const toggleLoginType = () => {
    loginType === 'join' ? setLoginType('create') : setLoginType('join');
  };

  return (
    <div className='App'>
      <Nav />
      <Switch>
        <Route exact path='/'>
          {loginType === 'create' ? (
            <CreateRoomForm toggleLogin={toggleLoginType} />
          ) : (
            <JoinRoomForm toggleLogin={toggleLoginType} />
          )}
        </Route>
        <Route exact path='/lobby'>
          <Lobby />
        </Route>
        <Route exact path='/game'>
          <Game />
        </Route>
        <Route exact path='/testing'>
          <main>
            <GameRoundEnd
              answers={[
                {
                  answer: 'The plath to choose is the path less trodden.',
                  userName: 'DAN',
                  selectedBy: ['DAN'],
                },
              ]}
              advanceGame={() => console.log('hi')}
            />
          </main>
        </Route>
        <Route>
          <h1>404, not found</h1>
        </Route>
      </Switch>
      <img id='bg-img' src={logo} alt='illustration of woman reading book' />
    </div>
  );
}

export default App;
