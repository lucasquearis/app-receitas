import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {
  Home,
  Foods,
  Drinks,
  Explore,
  Profile,
  Done,
  Favorites,
  ExploreFoods,
  ExploreDrinks,
  ExploreFoodsIngredients,
  ExploreDrinksIngredients,
  ExploreArea,
  FoodRecipe,
  DrinkRecipe,
  InProgressFood,
  InProgressDrink,
  NotFound,
} from './pages';
import './App.css';

const App = () => (
  <Switch>
    <Route
      path="/bebidas/:id/in-progress"
      component={ InProgressDrink }
    />
    <Route path="/bebidas/:id" component={ DrinkRecipe } />
    <Route exact path="/bebidas" component={ Drinks } />
    <Route path="/comidas/:id/in-progress" component={ InProgressFood } />
    <Route path="/comidas/:id" component={ FoodRecipe } />
    <Route path="/comidas" component={ Foods } />
    <Route
      path="/explorar/comidas/ingredientes"
      component={ ExploreFoodsIngredients }
    />
    <Route
      path="/explorar/bebidas/ingredientes"
      component={ ExploreDrinksIngredients }
    />
    <Route path="/explorar/comidas/area" component={ ExploreArea } />
    <Route path="/explorar/bebidas/area" component={ NotFound } />
    <Route path="/explorar/bebidas" component={ ExploreDrinks } />
    <Route path="/explorar/comidas" component={ ExploreFoods } />
    <Route path="/explorar" component={ Explore } />
    <Route path="/perfil" component={ Profile } />
    <Route path="/receitas-feitas" component={ Done } />
    <Route path="/receitas-favoritas" component={ Favorites } />
    <Route exact path="/" component={ Home } />
    <Route component={ NotFound } />
  </Switch>
);

export default App;
