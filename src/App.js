import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './components/Login';

function App() {
  return (
    <Provider>
      <Route exact path="/" component={ Login } />
    </Provider>
  );
}

export default App;
