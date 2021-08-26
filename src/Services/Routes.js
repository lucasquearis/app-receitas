import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Drinks from '../Pages/Drinks';
import DrinkInProgress from '../Pages/DrinkInProgress';
import DrinkRecipeDetails from '../Pages/DrinkRecipeDetails';
import Explore from '../Pages/Explore';
import ExploreDrinksAndFoods from '../Pages/ExploreDrinksAndFoods';
import ExploreDrinksAndFoodsByIng from '../Pages/ExploreDrinksAndFoodsByIngredients';
import ExploreFoodsByOrigin from '../Pages/ExploreFoodsByOrigin';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import Foods from '../Pages/Foods';
import FoodInProgress from '../Pages/FoodInProgress';
import FoodRecipeDetails from '../Pages/FoodRecipeDetails';
import Login from '../Pages/Login';
import MadeRecipes from '../Pages/MadeRecipes';
import Profile from '../Pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/bebidas" component={ Drinks } />
      <Route
        exact
        path="/bebidas/:id-da-receita/in-progress"
        component={ DrinkInProgress }
      />
      <Route exact path="/bebidas/:id-da-receita" component={ DrinkRecipeDetails } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinksAndFoods } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksAndFoodsByIng }
      />
      <Route exact path="/explorar/comidas" component={ ExploreDrinksAndFoods } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreDrinksAndFoodsByIng }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByOrigin } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/comidas" component={ Foods } />
      <Route
        exact
        path="/comidas/:id-da-receita/in-progress"
        component={ FoodInProgress }
      />
      <Route exact path="/comidas/:id-da-receita" component={ FoodRecipeDetails } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/receitas-feitas" component={ MadeRecipes } />
      <Route exact path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default Routes;
