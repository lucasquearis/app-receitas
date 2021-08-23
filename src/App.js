import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Comidas from './pages/Comidas';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
    </Switch>
  );
}

export default App;
