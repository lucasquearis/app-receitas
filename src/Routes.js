// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipesDetails from './pages/RecipesDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/comidas/:id" component={ RecipesDetails } />
      <Route exact path="/bebidas/:id" component={ RecipesDetails } />
    </Switch>
  );
}

export default Routes;
