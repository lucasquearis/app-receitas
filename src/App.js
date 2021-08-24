import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreIngredient from './pages/ExploreIngredient';
import ExploreOrigin from './pages/ExploreOrigin';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/{recipe_id}" component={ Foods } />
      <Route exact path="/bebidas/{drink_id}" component={ Drinks } />
      <Route exact path="/comidas/{recipe_id}/in-progress" component={ Foods } />
      <Route exact path="/bebidas/{drink_id}/in-progress" component={ Drinks } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

    </Switch>
  );
}

export default App;
