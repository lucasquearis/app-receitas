import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProviderContext from './context/ProviderContext';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreOrigin from './pages/ExploreOrigin';
import IngredientsExploreFood from './pages/IngredientsExploreFood';
import IngredientsExploreDrink from './pages/IngredientsExploreDrink';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import FoodsOrDrinks from './pages/FoodsOrDrinks';

function App() {
  return (
    <ProviderContext>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" render={ () => <FoodsOrDrinks title="Comidas" /> } />
        <Route exact path="/bebidas" render={ () => <FoodsOrDrinks title="Bebidas" /> } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsExploreFood }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsExploreDrink }
        />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route
          exact
          path="/:type/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/:type/:id/in-progress"
          render={ (props) => <RecipesInProgress { ...props } /> }
        />
      </Switch>
    </ProviderContext>
  );
}

export default App;
