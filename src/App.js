import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {
  Meals,
  Login,
  Profile,
  Drinks,
  RecipeDetails,
  Explore,
  InProgressDrink,
  InProgressMeal,
  RecipesDone,
  FavoritesRecipes,
  ExploreIngredients,
  ExploreOrigin,
  ExploreDrinks,
  ExploreMeals } from './pages';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ InProgressMeal } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/comidas" component={ Meals } />
        <Route path="/bebidas/:id/in-progress" component={ InProgressDrink } />
        <Route path="/bebidas/:id" component={ RecipeDetails } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/explorar/comidas/ingredientes" component={ ExploreIngredients } />
        <Route path="/explorar/comidas/area" component={ ExploreOrigin } />
        <Route path="/explorar/comidas" component={ ExploreMeals } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExploreIngredients } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
      </Switch>
    </Provider>
  );
}

export default App;
