import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Pages from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Pages.LoginPage } />

      <Route path="/comidas/:id/in-progress" component={ Pages.ComidasInProgress } />
      <Route path="/comidas/:id" component={ Pages.ComidasDetails } />
      <Route path="/comidas" component={ Pages.HomePage } />

      <Route path="/bebidas/:id/in-progress" component={ Pages.BebidasInProgress } />
      <Route path="/bebidas/:id" component={ Pages.BebidasDetails } />
      <Route path="/bebidas" component={ Pages.HomePage } />

      <Route
        path="/explorar/comidas/ingredientes"
        component={ Pages.ExplorarComidasIngredients }
      />
      <Route path="/explorar/comidas/area" component={ Pages.ExplorarComidasArea } />
      <Route path="/explorar/comidas" component={ Pages.ExplorarComidasPage } />

      <Route
        path="/explorar/bebidas/ingredientes"
        component={ Pages.ExplorarBebidasIngredients }
      />
      <Route path="/explorar/bebidas" component={ Pages.ExplorarBebidasPage } />

      <Route path="/explorar" component={ Pages.ExplorarPage } />

      <Route path="/perfil" component={ Pages.PerfilPage } />

      <Route path="/receitas-feitas" component={ Pages.ReceitasFeitasPage } />
      <Route path="/receitas-favoritas" component={ Pages.ReceitasFavoritasPage } />
    </Switch>
  );
}
