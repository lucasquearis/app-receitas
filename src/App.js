import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import './App.css';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

function App() {
  return (
    <Header />
=======
import {
  Login,
  Meals,
  Drinks,
  MealsDetails,
  DrinksDetails,
  MealsInProgress,
  DrinksInProgress,
  Explorer,
  MealsExplorer,
  DrinksExplorer,
  MealsByIngredients,
  DrinksByIngredients,
  MealsByArea,
  Profile,
  DoneRecipes,
  FavouriteRecipes,
} from './pages';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ MealsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route path="/comidas/:id/in-progress" component={ MealsInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ MealsExplorer } />
        <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />
        <Route path="/explorar/comidas/ingredientes" component={ MealsByIngredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ DrinksByIngredients } />
        <Route path="/explorar/comidas/area" component={ MealsByArea } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavouriteRecipes } />
      </Switch>
    </Provider>
>>>>>>> main-group-11
  );
}

export default App;
