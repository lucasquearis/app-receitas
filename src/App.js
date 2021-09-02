import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/MyContextProvider';
import DoneRecipes from './pages/DoneRecipes';
import DrinkProgress from './pages/DrinkProgress';
import DrinkRecipeDetails from './pages/DrinkRecipeDetails';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksByIngredient from './pages/ExploreDrinksByIngredient';
import ExploreMeals from './pages/ExploreMeals';
import ExploreMealsByIngredient from './pages/ExploreMealsByIngredient';
import ExploreMealsByOrigin from './pages/ExploreMealsByOrigin';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import MealProgress from './pages/MealProgress';
import MealRecipeDetails from './pages/MealRecipeDetails';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ MealRecipeDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkRecipeDetails } />
        <Route path="/comidas/:id/in-progress" component={ MealProgress } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreMealsByIngredient }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredient }
        />
        <Route path="/explorar/comidas/area" component={ ExploreMealsByOrigin } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
