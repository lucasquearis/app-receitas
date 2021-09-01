import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as Pages from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Pages.LoginPage } />

      <Route path="/comidas/:id/in-progress" component={ Pages.ReceitaEmProgressoPage } />

      <Route path="/bebidas/:id/in-progress" component={ Pages.ReceitaEmProgressoPage } />

      <Route path="/comidas/:id" component={ Pages.ReceitasDetalhesPage } />
      <Route path="/comidas" component={ Pages.HomePage } />

      <Route path="/bebidas/:id" component={ Pages.ReceitasDetalhesPage } />
      <Route path="/bebidas" component={ Pages.HomePage } />

      <Route
        path="/explorar/comidas/ingredientes"
        component={ Pages.ExplorarIngredients }
      />
      <Route path="/explorar/comidas/area" component={ Pages.ExplorarComidasArea } />
      <Route path="/explorar/comidas" component={ Pages.ExplorarRecipesPage } />

      <Route
        path="/explorar/bebidas/ingredientes"
        component={ Pages.ExplorarIngredients }
      />
      <Route path="/explorar/bebidas/area" component={ Pages.NotFoundPage } />
      <Route path="/explorar/bebidas" component={ Pages.ExplorarRecipesPage } />

      <Route path="/explorar" component={ Pages.ExplorarPage } />

      <Route exact path="/perfil" component={ Pages.PerfilPage } />

      <Route path="/receitas-feitas" component={ Pages.ReceitasFeitasPage } />
      <Route path="/receitas-favoritas" component={ Pages.ReceitasFavoritasPage } />

      <Route path="*" component={ Pages.NotFoundPage } />
    </Switch>
  );
}
