import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>

          <Route exact to="/" component={ Login } />
          <Route to="/comidas" component={ Comidas } />
          {/*
          <Route to="/" component={ Login } />
          <Route to="/bebidas" component={ Login } />
          <Route to="/comidas/{id-da-receita}" component={ Login } />
          <Route to="/bebidas/{id-da-receita}" component={ Login } />
          <Route to="/comidas/{id-da-receita}/in-progress" component={ Login } />
          <Route to="/bebidas/{id-da-receita}/in-progress" component={ Login } />
          <Route to="/explorar" component={ Login } />
          <Route to="/explorar/comidas" component={ Login } />
          <Route to="/explorar/bebidas" component={ Login } />
          <Route to="/explorar/comidas/ingredientes" component={ Login } />
          <Route to="/explorar/bebidas/ingredientes" component={ Login } />
          <Route to="/explorar/comidas/area" component={ Login } />
          <Route to="/perfil" component={ Login } />
          <Route to="/receitas-feitas" component={ Login } />
          <Route to="/receitas-favoritas" component={ Login } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
