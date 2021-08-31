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
          render={ (props) => <Foods { ...props } /> }
        />

        <Route
          exact
          path="/bebidas"
          render={ (props) => <Drinks { ...props } /> }
        />

        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ ProgressFood }
        />

        <Route
          path="/bebidas/:id/in-progress"
          component={ ProgressDrink }
        />

        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <DetailsFood { ...props } /> }
        />

        <Route
          path="/bebidas/:id"
          render={ (props) => <DetailsDrink { ...props } /> }
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
          // component={ FavoritesRecipes }
          render={ (props) => <FavoritesRecipes { ...props } /> }
        />

      </Switch>
    </BrowserRouter>
  );
}
