// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meals from './pages/Meals';
// components
import Login from './pages/Login';
import OneMeal from './pages/OneMeal';
import OneDrink from './pages/OneDrink';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Meals } />
      <Route path="/comidas/:id" component={ OneMeal } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/bebidas/:id" component={ OneDrink } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;
