import React, { useState } from 'react';
import { CreateRoomForm, JoinRoomForm, Nav } from './Components';
import { Game } from './Pages';
import { Switch, Route } from 'react-router-dom';

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
          <Game />
        </Route>
        <Route>
          <h1>404, not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
