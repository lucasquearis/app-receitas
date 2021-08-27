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

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas" component={ Meals } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/comidas/:id" component={ RecipesDetails } />
      <Route exact path="/bebidas/:id" component={ RecipesDetails } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
      <Route exact path="/explorar/comidas" component={ ExplorerFoods } />
      {/* <Route exact path="/comidas" component={ Foods } /> */}
      {/* <Route exact path="/bebidas" component={ Drinks } /> */}
      {/* <Route path="/comidas/:id" component={ OneRecept } /> */}
      {/* <Route path="/explorar/comidas" component={ Colocar aqui o componente } /> */}
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;
