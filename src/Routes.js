// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explorer from './pages/Explorer';
import ExplorerDrinks from './pages/ExplorerDrinks';

// components
import Meals from './pages/Meals';
import Login from './pages/Login';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Drinks from './pages/Drinks';
import RecipesDetails from './pages/RecipesDetails';
import ExplorerFoods from './pages/ExplorerFoods';
import Ingredients from './pages/Ingredients';
import OriginExplorer from './pages/OriginExplorer';
import MakedRecipes from './pages/MakedRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ Ingredients } />
      <Route exact path="/explorar/comidas" component={ ExplorerFoods } />
      <Route exact path="/explorar/comidas/ingredientes" component={ Ingredients } />
      <Route exact path="/explorar/comidas/area" component={ OriginExplorer } />
      <Route exact path="/receitas-feitas" component={ MakedRecipes } />
      <Route exact path="/comidas/:id" component={ RecipesDetails } />
      <Route exact path="/bebidas/:id" component={ RecipesDetails } />
    </Switch>
  );
}

export default Routes;
