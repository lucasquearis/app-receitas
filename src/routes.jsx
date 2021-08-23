import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Food from './pages/Food';
import Home from './pages/Home';
import Drink from './pages/Drink';
import Explore from './pages/Explore';
import Perfil from './pages/Perfil';
import FoodRecipe from './pages/FoodRecipe';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={ Home } />
      <Route path="/comidas" component={ Food } />
      <Route path="/bebidas" component={ Drink } />
      {/* <Route path={ `/comidas/${id}` } component={ null } /> */}
      {/* <Route path={ `/bebidas/${id}` } component={ null } /> */}
      {/* <Route path={ `/comidas/${id}/in-progress` } component={ null } /> */}
      {/* <Route path={ `/bebidas/${id}/in-progress` } component={ null } /> */}
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas" component={ null } />
      <Route path="/explorar/bebidas" component={ null } />
      <Route path="/explorar/comidas/ingredientes" component={ null } />
      <Route path="/explorar/bebidas/ingredientes" component={ null } />
      <Route path="/explorar/comidas/area" component={ null } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ FoodRecipe } />
      <Route path="/receitas-favoritas" component={ Perfil } />
    </Switch>
  );
}

export default Routes;
