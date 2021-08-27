import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import TelaDeFavoritos from './pages/TelaDeFavoritos';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ Comidas } />
          <Route path="/comidas/:id" component={ Comidas } />
          <Route path="/bebidas" component={ Bebidas } />
          <Route path="/bebidas/:id" component={ Bebidas } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ TelaDeFavoritos } />

          {/* <Route path="/comidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/bebidas/{id-da-receita}/in-progress" component={ Login } />
          <Route path="/explorar" component={ Login } />
          <Route path="/explorar/comidas" component={ Login } />
          <Route path="/explorar/bebidas" component={ Login } />
          <Route path="/explorar/comidas/ingredientes" component={ Login } />
          <Route path="/explorar/bebidas/ingredientes" component={ Login } />
          <Route path="/explorar/comidas/area" component={ Login } />
          */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
