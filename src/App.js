import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import AppProvider from './context/AppProvider';
import Drinks from './pages/drinks/Drinks';
import Food from './pages/food/Food';
import FoodDetails from './pages/foodDetails/FoodDetails';
import DrinkDetails from './pages/drinkDetails/DrinkDetails';
import FoodProcess from './pages/foodProcess/FoodProcess';
import Explore from './pages/explore/Explore';
import ExploreFood from './pages/exploreFood/ExploreFood';
import ExploreDrink from './pages/exploreDrink/ExploreDrink';
import ExploreFoodIng from './pages/exploreFoodIng/ExploreFoodIng';
import ExploreDrinkIng from './pages/exploreDrinkIng/ExploreDrinkIng';
import ExploreFoodArea from './pages/exploreFoodArea/ExploreFoodArea';
import RecipesMade from './pages/recipesMade/RecipesMade';
import FavoriteRecipes from './pages/favoriteRecipes/FavoriteRecipes';
import LoginPage from './pages/loginPage/LoginPage';

const App = () => (
  <div className="App">
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas" component={ Food } />
        <Route exact path="/comidas/:id" component={ FoodDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodProcess } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodProcess } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFood } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIng }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIng }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodArea } />
        <Route
          exact
          path="/explorar/bebidas/area"
          render={ () => <span>Not Found</span> }
        />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </AppProvider>
  </div>
);

export default App;
