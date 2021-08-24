// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FooterMenu from './pages/FooterMenu';
import Explorer from './pages/Explorer';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/footer"
        component={ FooterMenu }
      />
      <Route
        exact
        path="/explorar"
        component={ Explorer }
      />
      Provisório
    </Switch>
  );
}

export default Routes;
