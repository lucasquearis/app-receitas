// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// components
import Login from './pages/Login';
import MealsDetails from './pages/MealsDetails';
import Profile from './pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/comidas/:id" component={ MealsDetails } />
    </Switch>
  );
}

export default Routes;
