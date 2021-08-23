import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import Search from './pages/Search';
import SearchDetailsFood from './pages/SeachDetailsFood';
import SearchDetailsDrinks from './pages/SearchDetailsDrinks';
import SearchFoodByIngredients from './pages/SearchFoodByIngredients';
import SearchDrinksByIngredients from './pages/SearchDrinksByIngredients';
import SearchByOrigin from './pages/SearchByOrigin';
import Profile from './pages/Profile';
import FinishedRecipes from './pages/FinishedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas" component={ Recipes } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/comidas/{id-da-receita}" component={ FoodDetails } />
          <Route exact path="/explorar" component={ Search } />
          <Route exact path="/explorar/comidas" component={ SearchDetailsFood } />
          <Route exact path="/explorar/bebidas" component={ SearchDetailsDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ SearchFoodByIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ SearchDrinksByIngredients }
          />
          <Route exact path="/explorar/comidas/area" component={ SearchByOrigin } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/receitas-feitas" component={ FinishedRecipes } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
