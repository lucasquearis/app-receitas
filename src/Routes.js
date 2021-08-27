import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Perfil from './pages/Perfil';
import Explore from './pages/Explore';
import {
  MEALS_LIST,
  MEALS_BY_CATEGORY,
  MEALS_CATEGORIES,
  DRINKS_CATEGORIES,
  DRINKS_BY_CATEGORY,
  DRINKS_LIST,
} from './services';

function Routes() { // Esse arquivo com nome "Principal" é ainda muito provisório.
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/comidas"
        render={ () => (
          <Principal
            categoriesEndPoint={ MEALS_CATEGORIES }
            getByCategoryEndPoint={ MEALS_BY_CATEGORY }
            listEndPoint={ MEALS_LIST }
            type="meals"
          />
        ) }
      />
      <Route
        exact
        path="/bebidas"
        render={ (props) => (
          <Principal
            { ...props }
            categoriesEndPoint={ DRINKS_CATEGORIES }
            getByCategoryEndPoint={ DRINKS_BY_CATEGORY }
            listEndPoint={ DRINKS_LIST }
            type="drinks"
          />
        ) }
      />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/explorar" component={ Explore } />
      {/* <Route exact path="/comidas/:id" component={ Detalhe } />
      <Route exact path="/bebidas/:id" component={ Detalhe } /> */}
    </Switch>
  );
}

export default Routes;
