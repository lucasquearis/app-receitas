import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Profile, MainMeals, MainDrinks, MealDetails, DrinkDetails,
  InProgressMeals, InProgressDrinks, Explore, MealIngredients,
  DrinkIngredients, ExploreMeals, ExploreDrinks, ExploreOrigin,
  FavoriteRecipes, DoneRecipes, NotFound } from './pages';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
      <Route exact path="/explorar/comidas/ingredientes" component={ MealIngredients } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas" component={ ExploreMeals } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/bebidas/:id/in-progress" component={ InProgressDrinks } />
      <Route exact path="/comidas/:id/in-progress" component={ InProgressMeals } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/comidas/:id" component={ MealDetails } />
      <Route exact path="/bebidas" component={ MainDrinks } />
      <Route exact path="/comidas" component={ MainMeals } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
