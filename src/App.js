import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './provider/Provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
