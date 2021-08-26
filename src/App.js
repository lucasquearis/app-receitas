import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Bebidas from './pages/bebidas';
import './globalStyles.css';
import FoodRecipes from './pages/comidas';
import Explorar from './pages/explorar';
import Perfil from './pages/perfil';
import ReceitasFav from './pages/receitas-favoritas';
import ReceitasFeitas from './pages/receitas-feitas';
import { ContextProvider } from './context/RecipesContext';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Switch>
          <Route exact path="/comidas/:param1?/:param2?" component={ FoodRecipes } />
          <Route exact path="/bebidas/:param1?/:param2?" component={ Bebidas } />
          <Route exact path="/explorar/:param1?/:param2?" component={ Explorar } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFav } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/" component={ Login } />
        </Switch>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
