import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/MyContextProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Foods } />
      </Switch>
    </Provider>
  );
}

export default App;
