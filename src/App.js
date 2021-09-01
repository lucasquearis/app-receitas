import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Provider from './context/Provider';
import DrinkDetails from './pages/Details/Drink';
import MealDetails from './pages/Details/Meal';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import InProgress from './pages/InProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ExplorarDrinks from './pages/Explore/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';
import OriginFood from './pages/Explore/Origin/OriginFood';

import './App.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route exact path="/comidas/:id" component={ MealDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route
          exact
          path="/explorar/comidas"
          render={ (props) => <ExploreFoods { ...props } endpoint="themealdb" /> }
        />
        <Route
          exact
          path="/explorar/bebidas"
          render={ (props) => <ExplorarDrinks { ...props } endpoint="thecocktaildb" /> }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ OriginFood } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-favoritas" component={ Favorites } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
