import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Home,
  Foods,
  Drinks,
  Explore,
  Profile,
  Made,
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
} from './pages';
import store from './redux';
import './App.css';

const App = () => (
  <Provider store={ store }>
    <BrowserRouter>
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
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ Made } />
        <Route path="/receitas-favoritas" component={ Favorites } />
        <Route exact path="/" component={ Home } />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
