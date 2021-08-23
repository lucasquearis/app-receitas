import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './provider/Provider';
import Login from './pages/Login';
import MainFoods from './pages/MainFoods';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ MainFoods } />
      </Switch>
    </Provider>
  );
}

export default App;
