import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import BebidasOuComidas from './pages/BebidasOuComidas';
import Profile from './pages/Profile';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';

function App() {
  return (
    <Provider>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/explorar/" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ BebidasOuComidas } />
      <Route path="/explorar/bebidas" component={ BebidasOuComidas } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Provider>
  );
}

export default App;
