import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainPage } />
    </Switch>
  );
}

export default App;
