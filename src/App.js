import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './Context/Provider';
import * as Pages from './Pages';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Pages.Login } />
        <Route exact path="/comidas" component={ Pages.Comidas } />
        <Route exact path="/bebidas" component={ Pages.Bebidas } />
        <Route path="/comidas/:id" component={ Pages.DetalheComida } />
        <Route path="/bebidas/:id" component={ Pages.DetalheBebida } />
        <Route path="/comidas/:id/in-progress" component={ Pages.DetalheReceitaComida } />
        <Route path="/bebidas/:id/in-progress" component={ Pages.DetalheReceitaBebida } />
        <Route exact path="/explorar" component={ Pages.Explorar } />
        <Route exact path="/explorar/comidas" component={ Pages.ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ Pages.ExplorarBebidas } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ Pages.ExplorarComidaIngrediente }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ Pages.ExplorarBebidaIngrediente }
        />
        <Route path="/explorar/comidas/area" component={ Pages.ExplorarLocalOrigem } />
        <Route path="/perfil" component={ Pages.Perfil } />
        <Route path="/receitas-feitas" component={ Pages.ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ Pages.ReceitasFavoritas } />
        <Route path="*" component={ Pages.Erro } />
      </Switch>
    </Provider>
  );
}

export default App;
