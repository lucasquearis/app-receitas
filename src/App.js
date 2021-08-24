import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import BebidasExp from './pages/BebidasExp';
import ComidasExp from './pages/ComidasExp';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/explorar" component={ Explorar } />
          <Route path="/explorar/comidas" component={ ComidasExp } />
          <Route path="/explorar/bebidas" component={ BebidasExp } />
          {/*
          <Route path="/" component={ Login } />
          {/* <Route path="/comidas" component={ Login } />
          <Route path="/bebidas" component={ Login } />
          <Route path="/comidas/{id-da-receita}" component={ Login } />
          <Route path="/bebidas/{id-da-receita}" component={ Login } />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/explorar/comidas/ingredientes" component={ Login } />
          <Route path="/explorar/bebidas/ingredientes" component={ Login } />
          <Route path="/explorar/comidas/area" component={ Login } />
          <Route path="/perfil" component={ Login } />
          <Route path="/receitas-feitas" component={ Login } />
          <Route path="/receitas-favoritas" component={ Login } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
