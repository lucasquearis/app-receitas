import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/foods/Foods';
import Drinks from './pages/drinks/Drinks';
import DetailsFood from './pages/foods/DetailsFood';
import DetailsDrink from './pages/drinks/DetailsDrink';
import ProgressFood from './pages/foods/ProgressFood';
import ProgressDrink from './pages/drinks/ProgressDrink';
import Explore from './pages/explore/Explore';
import ExploreFoods from './pages/explore/ExploreFoods';
import ExploreDrinks from './pages/explore/ExploreDrinks';
import ExploreIngredientsFood from './pages/explore/ExploreIngredientsFood';
import ExploreIngredientsDrink from './pages/explore/ExploreIngredientsDrink';
import ExploreFoodsByArea from './pages/explore/ExploreFoodsByArea';
import Profile from './pages/profile/Profile';
import MadeRecipes from './pages/recipes/MadeRecipes';
import FavoritesRecipes from './pages/recipes/FavoritesRecipes';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>

        <Route
          exact
          path="/"
          component={ Login }
        />

        <Route
          exact
          path="/comidas"
          component={ Foods }
        />

        <Route
          exact
          path="/bebidas"
          component={ Drinks }
        />

        <Route
          path="/comidas/:id-da-receita/in-progress"
          component={ ProgressFood }
        />

        <Route
          path="/bebidas/:id-da-receita/in-progress"
          component={ ProgressDrink }
        />

        <Route
          path="/comidas/:id-da-receita"
          component={ DetailsFood }
        />

        <Route
          path="/bebidas/:id-da-receita"
          component={ DetailsDrink }
        />

        <Route
          exact
          path="/explorar"
          component={ Explore }
        />

        <Route
          exact
          path="/explorar/comidas"
          component={ ExploreFoods }
        />

        <Route
          exact
          path="/explorar/bebidas"
          component={ ExploreDrinks }
        />

        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredientsFood }
        />

        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredientsDrink }
        />

        <Route
          path="/explorar/comidas/area"
          component={ ExploreFoodsByArea }
        />

        <Route
          path="/perfil"
          component={ Profile }
        />

        <Route
          path="/receitas-feitas"
          component={ MadeRecipes }
        />

        <Route
          path="/receitas-favoritas"
          component={ FavoritesRecipes }
        />

      </Switch>
    </BrowserRouter>
  );
}
