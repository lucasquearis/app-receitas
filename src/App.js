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
import Explorar from './pages/explorar';
import ExplorarComidas from './pages/explorar/ExplorarComidas';
import ExplorarBebidas from './pages/explorar/ExplorarBebidas';
import DrinksIngredients from './pages/explorar/ingredientes/DrinksIngredients';
import FoodIngredients from './pages/explorar/ingredientes/FoodIngredients';
import AreaFood from './pages/explorar/area/AreaFood';
import AreaDrink from './pages/explorar/area/AreaDrinks';
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
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas/ingredientes" component={ FoodIngredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ DrinksIngredients } />
        <Route path="/explorar/comidas/area" component={ AreaFood } />
        <Route path="/explorar/bebidas/area" component={ AreaDrink } />
      </Switch>
    </div>
  );
}

export default App;
