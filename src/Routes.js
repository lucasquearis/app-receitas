import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Principal from './pages/Principal';
import Perfil from './pages/Perfil';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import DetailsMeals from './pages/DetailsMeals';
import {
  MEALS_LIST,
  MEALS_BY_CATEGORY,
  MEALS_CATEGORIES,
  DRINKS_CATEGORIES,
  DRINKS_BY_CATEGORY,
  DRINKS_LIST,
  INGREDIENT_MEALS,
  INGREDIENT_DRINKS,
  MEAL_DETAIL,
  DRINK_DETAIL,
} from './services';

function Routes() { // Esse arquivo com nome "Principal" é ainda muito provisório.
  return (
    <Switch>
      <Route exact path="/explorar/comidas/area" component={ Explore } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ Explore } />
      <Route exact path="/explorar/comidas/ingredientes" component={ Explore } />
      <Route exact path="/explorar/bebidas" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ Explore } />
      <Route
        exact
        path="/bebidas"
        render={ (props) => (
          <Principal
            { ...props }
            categoriesEndPoint={ DRINKS_CATEGORIES }
            getByCategoryEndPoint={ DRINKS_BY_CATEGORY }
            getByIngredientsEndPoint={ INGREDIENT_DRINKS }
            listEndPoint={ DRINKS_LIST }
            type="drinks"
          />
        ) }
      />
      <Route
        exact
        path="/comidas"
        render={ (props) => (
          <Principal
            { ...props }
            categoriesEndPoint={ MEALS_CATEGORIES }
            getByCategoryEndPoint={ MEALS_BY_CATEGORY }
            getByIngredientsEndPoint={ INGREDIENT_MEALS }
            listEndPoint={ MEALS_LIST }
            type="meals"
          />
        ) }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => (
          <DetailsMeals
            { ...props }
            recipeEndPoint={ MEAL_DETAIL }
            recommendationEndPoint={ DRINKS_LIST }
          />
        ) }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => (
          <DetailsMeals
            { ...props }
            recipeEndPoint={ DRINK_DETAIL }
            recommendationEndPoint={ MEALS_LIST }
          />
        ) }
      />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
