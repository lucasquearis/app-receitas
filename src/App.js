import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Foods from './pages/foods/Foods';
import Drinks from './pages/drinks/Drinks';
import DetailsDrink from './pages/drinks/DetailsDrink';
import Perfil from './pages/perfil/Profile';
import DetailsFood from './pages/foods/DetailsFood';
import RecipesInProgress from './pages/foods/RecipesInProgress';
import DrinksInProgress from './pages/drinks/drinksInProgress';
import FoodRecipesMade from './pages/foods/FoodRecipesMade';

function App() {
  return (
    <div className="containerBody">
      <Switch>
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => (
            <DetailsFood { ...props } />
          ) }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => (
            <DetailsDrink { ...props } />
          ) }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => (
            <RecipesInProgress { ...props } />
          ) }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => (
            <DrinksInProgress { ...props } />
          ) }
        />
        <Route
          exact
          path="/receitas-feitas"
          component={ FoodRecipesMade }
        />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
