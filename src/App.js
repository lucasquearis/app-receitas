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
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/comidas/:id" component={ Comidas } />
          <Route path="/bebidas" component={ Login } />
          <Route path="/bebidas/:id" component={ Login } />

          {/* <Route path="/comidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/explorar" component={ Login } />
          <Route path="/explorar/comidas" component={ Login } />
          <Route path="/explorar/bebidas" component={ Login } />
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
