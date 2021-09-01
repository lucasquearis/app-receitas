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
        <Route exact path="/" component={ Login } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />

      </Switch>
    </div>
  );
}

export default App;
