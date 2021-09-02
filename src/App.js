import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import Profile from './pages/Profile';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Bebidas from './pages/Bebidas';
import ComidasEmProcesso from './pages/ComidasEmProcesso';
import BebidasEmProcesso from './pages/BebidasEmProcesso';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidasPorIngrediente from './pages/ExplorarComidasPorIngrediente';
import ExplorarBebidasPorIngrediente from './pages/ExplorarBebidasPorIngrediente';
import ExplorarBebidasPorLocalidade from './pages/ExplorarBebidasPorLocalidade';
import ExplorarComidasPorLocalidade from './pages/ExplorarComidasPorLocalidade';
import BebidasDetalhes from './pages/BebidasDetalhes';
import ComidasDetalhes from './pages/ComidasDetalhes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasPorIngrediente }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ ComidasEmProcesso }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ BebidasEmProcesso }
        />
        <Route path="/comidas/:id" component={ ComidasDetalhes } />
        <Route path="/bebidas/:id" component={ BebidasDetalhes } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasPorIngrediente }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          component={ ExplorarBebidasPorLocalidade }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExplorarComidasPorLocalidade }
        />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </Provider>
  );
}

export default App;
