import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import Comidas from './pages/comidas/Comidas';
import Login from './pages/login/Login';
import Perfil from './pages/perfil/Perfil';
import Bebidas from './pages/bebidas/Bebidas';

function App() {
  return (
    <Switch>
      <div className="containerBoby">
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/bebidas" component={ Bebidas } />
      </div>
    </Switch>
  );
}

export default App;
