import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ <h1>AppReceitas</h1> } />
      {/* <Route path="/comidas" component={ } />
      <Route path="/bebidas" component={ } />
      <Route path="/comidas/{id-da-receita}" component={ } />
      <Route path="/bebidas/{id-da-receita}" component={ } />
      <Route path="/explorar" component={ } />
      <Route path="/explorar/comidas" component={ } />
      <Route path="/explorar/bebidas" component={ } />
      <Route path="/explorar/comidas/ingredientes" component={ } />
      <Route path="/explorar/bebidas/ingrediente" component={ } />
      <Route path="/explorar/comidas/area" component={ } />
      <Route path="/perfil" component={ } />
      <Route path="/receitas-feitas" component={ } />
      <Route path="/receitas-favoritas" component={ } /> */}
    </Switch>
  );
}

export default App;
