import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';
import Login from './pages/Login';
import Explore from './pages/Explore/Explore';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import FoodByIngredients from './pages/Explore/FoodByIngredients';
import DrinksByIngredients from './pages/Explore/DrinksByIngredients';
import ExploreByArea from './pages/Explore/ExploreByArea';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesDone from './pages/RecipesDone';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route exact path="/comidas/:id" component={ FoodsDetails } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/bebidas/:id" component={ DrinksDetails } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodByIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinksByIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas/" component={ ExploreFoods } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesDone } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
