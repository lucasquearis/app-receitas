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
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import LocalDeOrigem from './pages/LocalDeOrigem';
import ComidaIng from './pages/ComidaIng';
import BebidasIng from './pages/BebidasIng';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route path="/explorar/comidas/ingredientes" component={ ComidaIng } />
          <Route path="/explorar/comidas/area" component={ LocalDeOrigem } />
          <Route path="/explorar/comidas" component={ ComidasExp } />
          <Route path="/explorar/bebidas/area" component={ NotFound } />
          <Route path="/explorar/bebidas/ingredientes" component={ BebidasIng } />
          <Route path="/explorar/bebidas" component={ BebidasExp } />
          <Route exect path="/explorar" component={ Explorar } />
          <Route exact path="/perfil" component={ Perfil } />
          {/*
          <Route path="/comidas/:id" component={ Comidas } />
          <Route path="/bebidas/:id" component={ Bebidas } />
          <Route path="/comidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/receitas-feitas" component={ Login } />
          <Route path="/receitas-favoritas" component={ Login } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
