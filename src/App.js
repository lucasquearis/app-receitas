import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import ExploreByArea from './pages/ExploreByArea';
import ExploreByIngredient from './pages/ExploreByIngredient';
import ExploreDrinksOrMeals from './pages/ExploreDrinksOrMeals';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetail from './pages/RecipeDetail';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipesList from './pages/RecipesList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainProvider from './context/MainProvider';

function App() {
  return (
    <MainProvider>
      <Switch>
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route path="/explorar/comidas/ingredientes" component={ ExploreByIngredient } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExploreByIngredient } />
        <Route path="/comidas/:id" component={ RecipeDetail } />
        <Route path="/bebidas/:id" component={ RecipeDetail } />
        <Route path="/explorar/comidas" component={ ExploreDrinksOrMeals } />
        <Route path="/explorar/bebidas" component={ ExploreDrinksOrMeals } />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/comidas" component={ RecipesList } />
        <Route path="/bebidas" component={ RecipesList } />
        <Route path="/explorar" render={ (props) => <Explore { ...props } /> } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </MainProvider>
  );
}

export default App;
