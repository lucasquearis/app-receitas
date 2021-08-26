// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DrinksDetails from './pages/DrinksDetails';
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
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
    </Switch>
  );
}

export default Routes;
