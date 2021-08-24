import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ () => <Login /> }
      />
      <Route
        exact
        path="/comidas"
        component={ Foods }
      />
      <Route
        exact
        path="/bebidas"
        component={ Drinks }
      />
    </Switch>
  );
}

export default App;
