import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import ComidasDetails from '../pages/ComidasDetails';
import BebidasDetails from '../pages/BebidasDetails';
import ComidasProcess from '../pages/ComidasProcess';
import BebidasProcess from '../pages/BebidasProcess';
import Explorar from '../pages/Explorar';
import ComidasExplorar from '../pages/ComidasExplorar';
import BebidasExplorar from '../pages/BebidasExplorar';
import ComidasIngredientes from '../pages/ComidasIngedientes';
import BebidasIngredientes from '../pages/BebidasIngredientes';
import ComidasArea from '../pages/ComidasArea';
import Perfil from '../pages/Perfil';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/comidas:id" component={ ComidasDetails } />
      <Route exact path="/bebidas:id" component={ BebidasDetails } />
      <Route exact path="/comidas:id/in-progress" component={ ComidasProcess } />
      <Route exact path="/bebidas:id/in-progress" component={ BebidasProcess } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ComidasExplorar } />
      <Route exact path="/explorar/bebidas" component={ BebidasExplorar } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ComidasIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ BebidasIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Switch>
  );
}

export default Routes;
