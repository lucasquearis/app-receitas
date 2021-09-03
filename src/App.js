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
import ReceitasFeitas from './pages/ReceitasFeitas';
import TelaDeFavoritos from './pages/TelaDeFavoritos';
import LocalDeOrigem from './pages/LocalDeOrigem';
import ComidaIng from './pages/ComidaIng';
import BebidasIng from './pages/BebidasIng';
import NotFound from './pages/NotFound';
import Detalhes from './pages/Detalhes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/comidas/:id" key={ 1 } component={ Detalhes } />
          <Route exact path="/bebidas/:id" key={ 2 } component={ Detalhes } />
          <Route exact path="/comidas/:id/in-progress" key={ 3 } component={ Detalhes } />
          <Route exact path="/bebidas/:id/in-progress" key={ 4 } component={ Detalhes } />
          <Route exact path="/explorar/comidas" component={ ComidasExp } />
          <Route exact path="/explorar/bebidas" component={ BebidasExp } />
          <Route exact path="/explorar/comidas/area" component={ LocalDeOrigem } />
          <Route exact path="/explorar/comidas/ingredientes" component={ ComidaIng } />
          <Route exact path="/explorar/bebidas/ingredientes" component={ BebidasIng } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ TelaDeFavoritos } />
          <Route path="/" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
