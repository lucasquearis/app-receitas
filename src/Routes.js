import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';

function Routes() { // Esse arquivo com nome "Principal" é ainda muito provisório.
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Principal } />
      <Route exact path="/bebidas" component={ Principal } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/explorar" component={ Explorar } />
    </Switch>
  );
}

export default Routes;
