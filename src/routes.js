import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesMainPage from './pages/RecipesMainPage';
import RecipeInProgress from './pages/RecipeInProgress';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import Perfil from './pages/Perfil';

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
        <Route path="/explorar" component={ NotFound } />
        <Route path="/explorar/comidas" component={ NotFound } />
        <Route path="/explorar/bebidas" component={ NotFound } />
        <Route path="/explorar/comidas/ingredientes" component={ NotFound } />
        <Route path="/explorar/bebidas/ingredientes" component={ NotFound } />
        <Route path="/explorar/comidas/area" component={ NotFound } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ NotFound } />
        <Route path="/receitas-favoritas" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
