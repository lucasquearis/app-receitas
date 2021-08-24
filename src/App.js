import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import BebidasOuComidas from './pages/BebidasOuComidas';

function App() {
  return (
    <Provider>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/explorar/" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ BebidasOuComidas } />
      <Route path="/explorar/bebidas" component={ BebidasOuComidas } />
    </Provider>
  );
}

export default App;
