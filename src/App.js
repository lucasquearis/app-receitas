import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './Pages/Details';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainPage } />
      <Route exact path="/explorar" component={ Explore } />
    </Switch>
  );
}

export default App;
