import { CreateRoomForm, JoinRoomForm, Nav } from './Components';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <h1>Welcome to book app - name tbc</h1>
        </Route>
        <Route exact path='/join'>
          <JoinRoomForm />
        </Route>
        <Route exact path='/create'>
          <CreateRoomForm />
        </Route>
        <Route>
          <h1>404, not found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
