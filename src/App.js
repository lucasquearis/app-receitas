import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
<<<<<<< HEAD
import RecipeDetails from './pages/RecipeDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
=======
>>>>>>> 358348131d11a7d0e6c4d2dee59779377047a0da
import Profile from './pages/Profile';
import ExploreFoods from './pages/explore-pages/ExploreFoods';
import Explore from './pages/explore-pages/Explore';
import ExploreIngredients from './pages/explore-pages/ExploreIngredients';
import ExploreOrigin from './pages/explore-pages/ExploreOrigin';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreDrinks from './pages/explore-pages/ExploreDrinks';
import ExploreDrinkIngredient from './pages/explore-pages/ExploreDrinkIngredient';
import RecipeDetails from './pages/RecipeDetails';
import ProgressRecipes from './pages/ProgressRecipes';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngredient }
      />
      <Route
        exact
<<<<<<< HEAD
        path="/comidas/:id"
=======
        path="/:type/:id"
>>>>>>> 358348131d11a7d0e6c4d2dee59779377047a0da
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
<<<<<<< HEAD
        path="/bebidas/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
=======
        path="/:type/:id/in-progress"
        render={ (props) => <ProgressRecipes { ...props } /> }
>>>>>>> 358348131d11a7d0e6c4d2dee59779377047a0da
      />
      <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
    </Switch>
  );
}
