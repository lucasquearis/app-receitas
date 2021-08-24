import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Page from './pages/Page';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Page } />
    </Switch>
  );
}

export default App;
