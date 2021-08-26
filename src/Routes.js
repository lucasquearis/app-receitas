// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explorer from './pages/Explorer';
import ExplorerDrinks from './pages/ExplorerDrinks';
import Meals from './pages/Meals';

// components
import Login from './pages/Login';
import OneMeal from './pages/OneMeal';
import OneDrink from './pages/OneDrink';
import Profile from './pages/Profile';
<<<<<<< HEAD
=======
import Drinks from './pages/Drinks';
>>>>>>> 15bd7c685fcfecd598821de24e2ca3c852ab098b

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
      <Route path="/explorar/bebidas/:id" component={ SurpriseDrink } />
      {/* <Route exact path="/comidas" component={ Foods } /> */}
      {/* <Route exact path="/bebidas" component={ Drinks } /> */}
      {/* <Route path="/comidas/:id" component={ OneRecept } /> */}
      {/* <Route path="/explorar/comidas" component={ Colocar aqui o componente } /> */}
      <Route exact path="/comidas" component={ Meals } />
      <Route path="/comidas/:id" component={ OneMeal } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/bebidas/:id" component={ OneDrink } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;
