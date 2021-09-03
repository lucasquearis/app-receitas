import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './Pages/Explore';
import Login from './Pages/Login';
import FoodMainPage from './Pages/FoodMainPage';
import DrinkMainPage from './Pages/DrinkMainPage';
import DrinksExplore from './Pages/DrinksExplore';
import FoodExplore from './Pages/FoodExplore';
import FoodIngredientesExplore from './Pages/FoodIngredientesExplore';
import FoodPlaceExplore from './Pages/FoodPlaceExplore';
import Profile from './Pages/Profile';
import FoodDetails from './Pages/FoodDetails';
import DrinkDetails from './Pages/DrinkDetails';
import DrinkIngredientesExplore from './Pages/DrinksIngredientExplore';
import NotFound from './Pages/NotFound';
import DoneRecipes from './Pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/explorar/comidas/area"
        component={ FoodPlaceExplore }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodIngredientesExplore }
      />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinkIngredientesExplore }
      />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinksExplore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/comidas" component={ FoodMainPage } />
      <Route exact path="/bebidas" component={ DrinkMainPage } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/" component={ Login } />
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
