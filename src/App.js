import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import DrinkDetails from './pages/DrinkDetails';
import RecipesDetails from './pages/RecipesDetails';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExpComidasIngredientes from './pages/ExpComidasIngredientes';
import ExpBebidasIngredientes from './pages/ExpBebidasIngredientes';
import ExplorarOrigem from './pages/ExplorarOrigem';
import BebidasEmProgresso from './pages/BebidasEmProgresso';
import ComidasEmProgresso from './pages/ComidasEmProgresso';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route path="/bebidas/:id/in-progress" component={ BebidasEmProgresso } />
      <Route path="/comidas/:id/in-progress" component={ ComidasEmProgresso } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/comidas/:id" component={ RecipesDetails } />
      <Route path="/perfil" component={ Perfil } />
      <Route exact path="/comidas" component={ (props) => <Comidas { ...props } /> } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
      <Route path="/explorar/comidas/ingredientes" component={ ExpComidasIngredientes } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExpBebidasIngredientes } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/" component={ () => <Login /> } />
      <Route component={ NotFound } />
    </Switch>
  );
}
export default App;
