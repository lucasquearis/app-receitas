import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainFoods from './pages/MainFoods';
import MainDrinks from './pages/MainDrinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodsExplore from './pages/FoodsExplore';
import DrinksExplore from './pages/DrinksExplore';
import FoodIngredients from './pages/FoodIngredients';
import DrinkIngredients from './pages/DrinkIngredients';
import FoodByOrigin from './pages/FoodByOrigin';
// import FoodDetails from './pages/FoodDetails';
// import DrinkDetails from './pages/DrinkDetails';
// import ProgressFood from './pages/ProgressFood';
// import ProgressDrink from './pages/ProgressDrink';

function Routes() {
  return (
    <Switch>
      {/* <Route
        path={ `/bebidas/${id - da - receita}/in-progress` }
        component={ ProgressDrink }
      /> */}
      {/* <Route
        path={ `/comidas/${id - da - receita}/in-progress` }
        component={ ProgressFood }
      /> */}
      {/* <Route path={ `/bebidas/${id - da - receita}` } component={ DrinkDetails } />
      <Route path={ `/comidas/${id - da - receita}` } component={ FoodDetails } /> */}
      <Route path="/explorar/comidas/area" component={ FoodByOrigin } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinkIngredients } />
      <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
      <Route path="/explorar/bebidas" component={ DrinksExplore } />
      <Route path="/explorar/comidas" component={ FoodsExplore } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/bebidas" component={ MainDrinks } />
      <Route path="/comidas" component={ MainFoods } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
