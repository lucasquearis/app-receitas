import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import DrinkDetails from './components/DrinkDetails';
import RecipesDetails from './components/RecipesDetails';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
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
    <Switch>
      {/* <Route
        exact
        path="/comidas"
        component={ Foods }
      />
      <Route
        exact
        path="/bebidas"
        component={ Drinks }
      />
        component={ RecipesSearchBar }
      /> */}
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/comidas/:id" component={ RecipesDetails } />
      {/* <Route
        exact
        path="/bebidas"
        component={ DrinksSearchBar }
      /> */}
      {/* <Route exact path="/" component={ Home } /> */}
      <Route path="/perfil" component={ Perfil } />
      <Route exact path="/comidas" component={ (props) => <Comidas { ...props } /> } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
      <Route path="/explorar/comidas/ingredientes" component={ ExplorarIngredientes } />
      <Route path="/explorar/bebidas/ingredientes" component={ ExplorarIngredientes } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route exact path="/" component={ () => <Login /> } />
    </Switch>
  );
}
export default App;
