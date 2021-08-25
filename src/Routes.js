// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// components
import Profile from './pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;
