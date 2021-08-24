import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Foods from './pages/foods/Foods';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
