import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer/index';

import Login from './pages/Login';
import Provider from './context/Provider';

import './App.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" />
        <Route path="/bebidas" />
        <Route path="/comidas/:id" />
        <Route path="/bebidas/:id" />
        <Route path="/explorar" />
        <Route path="/explorar/comidas" />
        <Route path="/explorar/bebidas" />
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil" />
        <Route path="/receitas-feitas" />
        <Route path="/receitas-favoritas" />
      </Switch>
      <Footer />
    </Provider>
  );
}

export default App;
