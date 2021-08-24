import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';

function Routes() { // Esse arquivo com nome "Principal" é ainda muito provisório.
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/Comidas" component={ Principal } />
      <Route exact path="/Perfil" component={ Perfil } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
    </Switch>
  );
}

export default Routes;
