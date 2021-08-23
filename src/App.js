import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
