import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from '../Pages/Explore';
import ExploreDrinksAndFoods from '../Pages/ExploreDrinksAndFoods';
import ExploreDrinksAndFoodsByIng from '../Pages/ExploreDrinksAndFoodsByIngredients';
import ExploreFoodsByOrigin from '../Pages/ExploreFoodsByOrigin';
import FoodsAndDrinks from '../Pages/FoodsAndDrinks';
import Login from '../Pages/Login';
import MadeAndFavoriteRecipes from '../Pages/MadeAndFavoriteRecipes';
import NotFound from '../Pages/NotFound';
import Profile from '../Pages/Profile';
import RecipesDetails from '../Pages/RecipesDetails';
import RecipeInProgress from '../Pages/RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/bebidas" component={ FoodsAndDrinks } />
      <Route
        exact
        path="/bebidas/:recipeID/in-progress"
        render={ (props) => <RecipeInProgress { ...props } type="drink" /> }
      />
      <Route
        exact
        path="/bebidas/:recipeID"
        render={ (props) => <RecipesDetails { ...props } type="drink" /> }
      />
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
      <Route exact path="/receitas-favoritas" component={ MadeAndFavoriteRecipes } />
      <Route exact path="/comidas" component={ FoodsAndDrinks } />
      <Route
        exact
        path="/comidas/:recipeID/in-progress"
        render={ (props) => <RecipeInProgress { ...props } type="food" /> }
      />
      <Route
        exact
        path="/comidas/:recipeID"
        render={ (props) => <RecipesDetails { ...props } type="food" /> }
      />
      <Route exact path="/" component={ Login } />
      <Route exact path="/receitas-feitas" component={ MadeAndFavoriteRecipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar/bebidas/area" component={ NotFound } status={ 404 } />
    </Switch>
  );
}

export default Routes;
