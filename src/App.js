import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainProvider from './context/MainProvider';

function App() {
  return (
    <MainProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </MainProvider>
  );
}

export default App;
