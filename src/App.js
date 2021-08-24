import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={ LoginPage } />
    </Switch>
  </div>
);

export default App;
