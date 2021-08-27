import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Details,
  DrinkExplore,
  Explore,
  ExploreByArea,
  ExploreByIngredient,
  FoodExplore,
  Login,
  NotFound,
  Perfil,
  RecipeInProgress,
  RecipesDone,
  RecipesFav,
  RecipesMainPage,
} from './pages';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route exact path="/comidas" component={ RecipesMainPage } />
        <Route exact path="/bebidas" component={ RecipesMainPage } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreByIngredient }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreByIngredient }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route exact path="/explorar/bebidas/area" component={ ExploreByArea } />
        <Route exact path="/explorar/comidas" component={ FoodExplore } />
        <Route exact path="/explorar/bebidas" component={ DrinkExplore } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ RecipesDone } />
        <Route exact path="/receitas-favoritas" component={ RecipesFav } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
