import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Foods, Login, Profile } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default App;
