import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import Search from './pages/Search';
import SearchDetailsFood from './pages/SeachDetailsFood';
import SearchDetailsDrinks from './pages/SearchDetailsDrinks';
import SearchFoodByIngredients from './pages/SearchFoodByIngredients';
import SearchDrinksByIngredients from './pages/SearchDrinksByIngredients';
import SearchByOrigin from './pages/SearchByOrigin';
import Profile from './pages/Profile';
import FinishedRecipes from './pages/FinishedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/explorar" component={ Search } />
        <Route exact path="/explorar/comidas" component={ SearchDetailsFood } />
        <Route exact path="/explorar/bebidas" component={ SearchDetailsDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ SearchFoodByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ SearchDrinksByIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ SearchByOrigin } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ FinishedRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
