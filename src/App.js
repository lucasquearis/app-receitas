import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Drinks from './pages/Drinks';
import DrinksDetails from './pages/DrinksDetails';
import DrinksInProgress from './pages/DrinksInProgress';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import Food from './pages/Food';
import FoodDetails from './pages/FoodDetails';
import FoodInProgress from './pages/FoodInProgress';
import ExploreFood from './pages/ExploreFood';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import FoodByOrigin from './pages/FoodByOrigin';
import RecipesDone from './pages/RecipesDone';
import FavoriteRecipes from './pages/FavoriteRecipes';
import store from './redux/store/index';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Food } />
          <Route exact path="/comidas/{id-da-receita}" component={ FoodDetails } />
          <Route
            exact
            path="/comidas/{id-da-receita}/in-progress"
            component={ FoodInProgress }
          />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/bebidas/{id-da-receita}" component={ DrinksDetails } />
          <Route
            exact
            path="/bebidas/{id-da-receita}/in-progress"
            component={ DrinksInProgress }
          />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFood } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodByIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksByIngredients }
          />
          <Route exact path="/explorar/comidas/area" component={ FoodByOrigin } />
          <Route exact path="/receitas-feitas" component={ RecipesDone } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
