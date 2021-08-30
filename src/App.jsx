import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodsDetails from './pages/FoodsDetails';
import DrinksDetails from './pages/DrinksDetails';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByArea from './pages/ExploreByArea';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id" component={ FoodsDetails } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas/:id" component={ DrinksDetails } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar/comidas" component={ ExploreFoods } />
      <Route path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/ingredientes" component={ ExploreByIngredients } />
      <Route path="/explorar/comidas/area" component={ ExploreByArea } />
      {/*
      <Route path="/explorar/bebidas/ingrediente" component={ } />
      <Route path="/perfil" component={ } />
      <Route path="/receitas-feitas" component={ } />
      <Route path="/receitas-favoritas" component={ } /> */}
    </Switch>
  );
}

export default App;
