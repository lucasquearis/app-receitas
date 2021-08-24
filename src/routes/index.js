import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Pages from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Pages.LoginPage } />
      <Route path="/comidas" component={ Pages.ComidasPage } />
    </Switch>
  );
}
