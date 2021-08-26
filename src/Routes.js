// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Foods from './pages/Foods';
// components
import Login from './pages/Login';
import OneRecept from './pages/OneRecept';
import Profile from './pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route path="/comidas/:id" component={ OneRecept } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;
