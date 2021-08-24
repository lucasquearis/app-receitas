import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Profile from './pages/Profile';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Bebidas from './pages/Bebidas';
import ComidasEmProcesso from './pages/ComidasEmProcesso';
import BebidasEmProcesso from './pages/BebidasEmProcesso';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasPorIngrediente from './pages/ExplorarComidasPorIngrediente';
import ExplorarBebidasPorIngrediente from './pages/ExplorarBebidasPorIngrediente';
import ExplorarBebidasPorLocalidade from './pages/ExplorarBebidasPorLocalidade';
import ComidasDetalhes from './pages/ComidasDetalhes';
import BebidasDetalhes from './pages/BebidasDetalhes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/comidas/:id" component={ ComidasDetalhes } />
        <Route path="/bebidas/:id" component={ BebidasDetalhes } />
        <Route
          path="/comidas/:id/in-progress"
          component={ ComidasEmProcesso }
        />
        <Route
          path="/bebidas/:id/in-progress"
          component={ BebidasEmProcesso }
        />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasPorIngrediente }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasPorIngrediente }
        />
        <Route path="/explorar/comidas/area" component={ ExplorarBebidasPorLocalidade } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </Provider>
  );
}

export default App;
