import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipesMainPage from './pages/RecipesMainPage';
import NotFound from './pages/NotFound';

export default function Routes() {
  const id = 'olar';
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ RecipesMainPage } />
        <Route path="/bebidas" component={ RecipesMainPage } />
        <Route path={ `/comidas/${id}` } component={ NotFound } />
        <Route path={ `/bebidas/${id}` } component={ NotFound } />
        <Route path={ `/comidas/${id}/in-progress` } component={ NotFound } />
        <Route path={ `/bebidas/${id}/in-progress` } component={ NotFound } />
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
