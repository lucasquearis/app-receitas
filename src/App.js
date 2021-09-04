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
        <Route exact path="/app-receitas/" component={ Login } />
        <Route exact path="/app-receitas/comidas" component={ Meals } />
        <Route exact path="/app-receitas/bebidas" component={ Drinks } />
        <Route exact path="/app-receitas/comidas/:id" component={ MealRecipeDetails } />
        <Route exact path="/app-receitas/bebidas/:id" component={ DrinkRecipeDetails } />
        <Route path="/app-receitas/comidas/:id/in-progress" component={ MealProgress } />
        <Route path="/app-receitas/bebidas/:id/in-progress" component={ DrinkProgress } />
        <Route exact path="/app-receitas/explorar" component={ Explore } />
        <Route exact path="/app-receitas/explorar/comidas" component={ ExploreMeals } />
        <Route exact path="/app-receitas/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          path="/app-receitas/explorar/comidas/ingredientes"
          component={ ExploreMealsByIngredient }
        />
        <Route
          path="/app-receitas/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredient }
        />
        <Route
          path="/app-receitas/explorar/comidas/area"
          component={ ExploreMealsByOrigin }
        />
        <Route path="/app-receitas/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/app-receitas/perfil" component={ Profile } />
        <Route exact path="/app-receitas/receitas-feitas" component={ DoneRecipes } />
        <Route
          exact
          path="/app-receitas/receitas-favoritas"
          component={ FavoriteRecipes }
        />
        <Route path="app-receitas/*" component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
