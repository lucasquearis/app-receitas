import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';

function App() {
  return (
    <Provider>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
    </Provider>
  );
}

export default App;
