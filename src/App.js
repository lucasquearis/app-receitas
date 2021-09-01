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
import FoodIngredients from './pages/FoodIngredients';
import DrinksIngredients from './pages/DrinksIngredients';
import SearchByOrigin from './pages/SearchByOrigin';
import Profile from './pages/Profile';
import FinishedRecipes from './pages/FinishedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    // muito obrigado ao meu amigo Gedeão por ajudar à montar e organizar as minhas rotas.
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explorar" component={ Search } />
        <Route exact path="/explorar/comidas" component={ SearchDetailsFood } />
        <Route exact path="/explorar/bebidas" component={ SearchDetailsDrinks } />
        <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ DrinksIngredients } />
        <Route path="/explorar/comidas/area" component={ SearchByOrigin } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ FinishedRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
