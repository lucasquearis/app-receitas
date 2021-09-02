import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodsDet from './pages/Details/FoodsDet';
import DrinksDet from './pages/Details/DrinksDet';
import Explore from './pages/Explore/Explore';
import FoodExp from './pages/Explore/FoodExp';
import DrinkExp from './pages/Explore/DrinkExp';
import DrinkIngredients from './pages/Explore/DrinkIngredients';
import NotFound from './pages/NotFound';
import FoodIngredients from './pages/Explore/FoodIngredients';
import FoodAreaExp from './pages/Explore/FoodAreaExp';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';
import DrinksInProgress from './pages/InProgress/DrinksInProgress';
import FoodsInProgress from './pages/InProgress/FoodsInProgress';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodsInProgress } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinkIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ FoodIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ FoodAreaExp } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <FoodsDet { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinksDet { ...props } /> }
        />
        <Route exact path="/explorar/comidas" component={ FoodExp } />
        <Route exact path="/explorar/bebidas" component={ DrinkExp } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </Router>
  );
}

export default Routes;
