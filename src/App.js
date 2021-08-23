import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './provider/Provider';
import Login from './pages/Login';
import MainFoods from './pages/MainFoods';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MainFoods } />
        <Route exact path="/perfil" component={ Profile } />
      </Switch>
    </Provider>
  );
}

export default App;
