import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './Pages/Explore';
import Login from './Pages/Login';
import MainPage from './Pages/MainPage';
import DrinksExplore from './Pages/DrinksExplore';
import FoodExplore from './Pages/FoodExplore';
import FoodIngredientesExplore from './Pages/FoodIngredientesExplore';
import FoodPlaceExplore from './Pages/FoodPlaceExplore';
import Profile from './Pages/Profile';

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
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinksExplore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas" component={ MainPage } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
