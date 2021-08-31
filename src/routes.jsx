import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Food from './pages/Food';
import Home from './pages/Home';
import Drink from './pages/Drink';
import Explore from './pages/Explore';
import Perfil from './pages/Perfil';
import FoodRecipe from './pages/FoodRecipe';
import DrinkDetails from './pages/DrinkDetails';
import FoodDetails from './pages/FoodDetails';
import DrinkInProgess from './pages/DrinkInProgress';
import FoodInProgress from './pages/FoodInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/comidas" component={ Food } />
      <Route exact path="/bebidas" component={ Drink } />
      {/* <Route path="/comidas/:id" component={ FoodDetails } /> */}
      {/* <Route path="/bebidas/:id" component={ DrinkDetails } /> */}
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkInProgess } />
      <Route exact path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas" component={ null } />
      <Route path="/explorar/bebidas" component={ null } />
      <Route path="/explorar/comidas/ingredientes" component={ null } />
      <Route path="/explorar/bebidas/ingredientes" component={ null } />
      <Route path="/explorar/comidas/area" component={ null } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ FoodRecipe } />
      <Route path="/receitas-favoritas" component={ Perfil } />
    </Switch>
  );
}

export default Routes;
