import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesMainPage from './pages/RecipesMainPage';
import RecipeInProgress from './pages/RecipeInProgress';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import Perfil from './pages/Perfil';
import ExploreByArea from './pages/ExploreByArea';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ RecipesMainPage } />
        <Route exact path="/bebidas" component={ RecipesMainPage } />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/explorar" component={ NotFound } />
        <Route exact path="/explorar/bebidas" component={ NotFound } />
        <Route exact path="/explorar/comidas" component={ NotFound } />
        <Route exact path="/explorar/comidas/ingredientes" component={ NotFound } />
        <Route exact path="/explorar/bebidas/ingredientes" component={ NotFound } />
        <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ NotFound } />
        <Route exact path="/receitas-favoritas" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
