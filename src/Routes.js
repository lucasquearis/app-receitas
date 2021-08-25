import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Food from './Pages/Food';
import Drinks from './Pages/Drinks';
import Explorer from './Pages/Explorer';
import FoodDetails from './Pages/FoodDetails';
import DrinkDetails from './Pages/DrinkDetails';
import DoneRecipes from './Pages/DoneRecipes';
import FavorieRecipes from './Pages/FavoriteRecipes';
import DoingFood from './Pages/DoingFood';
import DoingDrinks from './Pages/DoingDrinks';
import FoodExplorer from './Pages/FoodExplorer';
import DrinkExplorer from './Pages/DrinkExplorer';
import ExploreByLocation from './Pages/ExploreByLocation';
import ExploreFoodByIngredients from './Pages/ExploreFoodByIngredients';
import ExploreDrinkByIngredients from './Pages/ExploreDrinkByIngredients';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkByIngredients }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreByLocation } />
        <Route path="/bebidas/:id/in-progress" component={ DoingDrinks } />
        <Route path="/comidas/:id/in-progress" component={ DoingFood } />
        <Route path="/receitas-favoritas" component={ FavorieRecipes } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/comidas/:id" component={ FoodDetails } />
        <Route path="/explorar/bebidas" component={ DrinkExplorer } />
        <Route path="/explorar/comidas" component={ FoodExplorer } />
        <Route path="/explorar" component={ Explorer } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas" component={ Food } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
