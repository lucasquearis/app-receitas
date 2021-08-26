import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDet from './pages/Details/FoodDet';
import DrinksDet from './pages/Details/DrinksDet';
import Explore from './pages/Explore/Explore';
import FoodExp from './pages/Explore/FoodExp';
import DrinkExp from './pages/Explore/DrinkExp';
import DrinkIngredients from './pages/Explore/DrinkIngredients';
import FoodIngredients from './pages/Explore/FoodIngredients';
import FoodAreaExp from './pages/Explore/FoodAreaExp';
import DrinkAreaExp from './pages/Explore/DrinkAreaExp';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id" render={ (props) => <FoodDet { ...props } /> } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas/:id" render={ (props) => <DrinksDet { ...props } /> } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/explorar/comidas" component={ FoodExp } />
        <Route path="/explorar/bebidas" component={ DrinkExp } />
        <Route path="/explorar/comidas/ingredientes" component={ DrinkIngredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ FoodIngredients } />
        <Route path="/explorar/comidas/area" component={ FoodAreaExp } />
        <Route path="/explorar/bebidas/area" component={ DrinkAreaExp } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/explorar/comidas" component={ FoodExp } />
        <Route path="/explorar/bebidas" component={ DrinkExp } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </Router>
  );
}

export default Routes;
