import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Provider from './context/Provider';
import Footer from './components/Footer';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';

import './App.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route path="/comidas/:id" />
        <Route path="/bebidas/:id" />
        <Route path="/explorar" />
        <Route path="/explorar/comidas" />
        <Route path="/explorar/bebidas" />
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" />
        <Route path="/receitas-favoritas" />
      </Switch>
      <Footer />
    </Provider>
  );
}

export default App;
