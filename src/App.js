import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" />
    </Switch>
  );
}

export default App;
