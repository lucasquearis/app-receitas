import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesMainPage from './pages/RecipesMainPage';
import RecipeInProgress from './pages/RecipeInProgress';
import NotFound from './pages/NotFound';

export default function Routes() {
  const id = '52772';
  const id2 = '11007';
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ RecipesMainPage } />
        <Route path="/bebidas" component={ RecipesMainPage } />
        <Route path={ `/comidas/${id}` } component={ NotFound } />
        <Route path={ `/bebidas/${id}` } component={ NotFound } />
        <Route exact path="/comidas/52772/in-progress" component={ RecipeInProgress } />
        <Route exact path={ `/bebidas/${id2}/in-progress` } component={ RecipeInProgress } />
        <Route path="/explorar" component={ NotFound } />
        <Route path="/explorar/comidas" component={ NotFound } />
        <Route path="/explorar/bebidas" component={ NotFound } />
        <Route path="/explorar/comidas/ingredientes" component={ NotFound } />
        <Route path="/explorar/bebidas/ingredientes" component={ NotFound } />
        <Route path="/explorar/comidas/area" component={ NotFound } />
        <Route path="/perfil" component={ NotFound } />
        <Route path="/receitas-feitas" component={ NotFound } />
        <Route path="/receitas-favoritas" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}
