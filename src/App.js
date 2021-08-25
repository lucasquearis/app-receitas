import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login/Login';
import DetailsFoods from './pages/recipedetails/DetailsFoods';
import DetailsDrinks from './pages/recipedetails/DetailsDrinks';
import Comidas from './pages/comidas/Comidas';
import Login from './pages/login/Login';
import Perfil from './pages/perfil/Perfil';
import Bebidas from './pages/bebidas/Bebidas';

function App() {
  return ( 
    <Switch >
      <Route exact path="/"component={ Login } />
      <Route path="/comidas"component={Comidas} />
       <Route path="/perfil" component={ Perfil } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route exact path="/comidas/:id" component={ DetailsFoods } />
      <Route exact path="/bebidas/:id" component={ DetailsDrinks } />
    </Switch>
  );
}

export default App;
