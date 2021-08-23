import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './pages';
import './App.css';

function App() {
  return (
    <Switch>
      {/* <Route exact path="/receitas-favoritas" component={  } />
      <Route exact path="/receitas-feitas" component={  } />
      <Route exact path="/perfil" component={  } />
      <Route exact path="/explorar/comidas/area" component={  } />
      <Route exact path="/explorar/bebidas/ingredientes" component={  } />
      <Route exact path="/explorar/comidas/ingredientes" component={  } />
      <Route exact path="/explorar/bebidas" component={  } />
      <Route exact path="/explorar/comidas" component={  } />
      <Route exact path="/explorar" component={  } />
      <Route exact path="/bebidas/{id-da-receita}/in-progress" component={  } />
      <Route exact path="/comidas/{id-da-receita}/in-progress" component={  } />
      <Route exact path="/bebidas/{id-da-receita}" component={  } />
      <Route exact path="/comidas/{id-da-receita}" component={  } />
      <Route exact path="/bebidas" component={  } />
      <Route exact path="/comidas" component={  } /> */}
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
