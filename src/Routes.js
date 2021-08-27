// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explorer from './pages/Explorer';
import ExplorerDrinks from './pages/ExplorerDrinks';

// components
import Meals from './pages/Meals';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import RecipesDetails from './pages/RecipesDetails';
import ExplorerFoods from './pages/ExplorerFoods';
import Ingredients from './pages/Ingredients';
import OriginExplorer from './pages/OriginExplorer';
import MakedRecipes from './pages/MakedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/comidas" component={ Meals } />
      <Route path="/profile" component={ Profile } />
      <Route path="/explorar" component={ Explorer } />
      <Route path="/profile" component={ Profile } />
      <Route path="/explorar/bebidas" component={ ExplorerDrinks } />
      <Route path="/explorar/bebidas/ingredientes" component={ Ingredients } />
      <Route path="/explorar/comidas" component={ ExplorerFoods } />
      <Route path="/explorar/comidas/ingredientes" component={ Ingredients } />
      <Route path="/explorar/comidas/area" component={ OriginExplorer } />
      <Route path="/receitas-feitas" component={ MakedRecipes } />
      <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route path="/comidas/:id" component={ RecipesDetails } />
      <Route path="/bebidas/:id" component={ RecipesDetails } />
    </Switch>
  );
}

export default Routes;
