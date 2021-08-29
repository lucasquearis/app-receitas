import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DrinkInProgress from '../Pages/DrinkInProgress';
import DrinkRecipeDetails from '../Pages/DrinkRecipeDetails';
import Explore from '../Pages/Explore';
import ExploreDrinks from '../Pages/ExploreDrinks';
import ExploreDrinksByIngredients from '../Pages/ExploreDrinksByIngredients';
import ExploreFoods from '../Pages/ExploreFoods';
import ExploreFoodsByIngredient from '../Pages/ExploreFoodsByIngredient';
import ExploreFoodsByOrigin from '../Pages/ExploreFoodsByOrigin';
import FoodsAndDrinks from '../Pages/FoodsAndDrinks';
import FoodInProgress from '../Pages/FoodInProgress';
import FoodRecipeDetails from '../Pages/FoodRecipeDetails';
import Login from '../Pages/Login';
import MadeAndFavoriteRecipes from '../Pages/MadeAndFavoriteRecipes';
import Profile from '../Pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/bebidas" component={ FoodsAndDrinks } />
      <Route
        exact
        path="/bebidas/:id-da-receita/in-progress"
        component={ DrinkInProgress }
      />
      <Route exact path="/bebidas/:id-da-receita" component={ DrinkRecipeDetails } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByOrigin } />
      <Route exact path="/receitas-favoritas" component={ MadeAndFavoriteRecipes } />
      <Route exact path="/comidas" component={ FoodsAndDrinks } />
      <Route
        exact
        path="/comidas/:id-da-receita/in-progress"
        component={ FoodInProgress }
      />
      <Route exact path="/comidas/:id-da-receita" component={ FoodRecipeDetails } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/receitas-feitas" component={ MadeAndFavoriteRecipes } />
      <Route exact path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default Routes;
