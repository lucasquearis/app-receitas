import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/perfil" component={ Profile } />
    </Switch>
  );
}
