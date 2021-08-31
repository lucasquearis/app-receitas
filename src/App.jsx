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

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route path="/comidas/:id" component={ FoodsDetails } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route path="/bebidas/:id" component={ DrinksDetails } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodByIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/" component={ ExploreFoods } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ RecipesDone } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
