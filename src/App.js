import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Home from './pages/Home';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ExplorarOrigem from './pages/ExplorarOrigem';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
        <Route path="/explorar/comidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />

      </Switch>
    </BrowserRouter>
    // O header tem os ícones corretos na tela de explorar comidas por ingrediente
    // - O header tem os ícones corretos na tela de explorar bebidas por ingrediente
    // - O header tem os ícones corretos na tela de explorar comidas por local de origem
    // - O header tem os ícones corretos na tela de perfil
    // - O header tem os ícones corretos na tela de receitas feitas
    // - O header tem os ícones corretos na tela de receitas favoritas
  );
}

export default App;
