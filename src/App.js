/* eslint-disable camelcase */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Foods from './pages/Foods';
import FoodDetails from './pages/FoodDetails';

import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';

import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreIngredient from './pages/ExploreIngredient';
import ExploreOrigin from './pages/ExploreOrigin';

import Login from './pages/Login';

import Profile from './pages/Profile';

import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ProgressRecipes from './pages/ProgressRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />

      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />

      <Route exact path="/comidas/:id/in-progress" component={ ProgressRecipes } />
      <Route exact path="/bebidas/:id/in-progress" component={ ProgressRecipes } />

      <Route exact path="/explorar" component={ Explore } />

      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default App;
