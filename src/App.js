import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={  } />
        <Route path="/bebidas" component={  } />
        <Route path={`/comidas/${id-da-receita}`} component={  } />
        <Route path={`/bebidas/${id-da-receita}`} component={  } />
        <Route path={`/comidas/${id-da-receita}/in-progress`} component={  } />
        <Route path={`/bebidas/${id-da-receita}/in-progress`} component={  } />
        <Route path="/explorar" component={  } />
        <Route path="/explorar/comidas" component={  } />
        <Route path="/explorar/bebidas" component={  } />
        <Route path="/explorar/comidas/ingredientes" component={  } />
        <Route path="/explorar/bebidas/ingredientes" component={  } />
        <Route path="/explorar/comidas/area" component={  } />
        <Route path="/perfil" component={  } />
        <Route path="/receitas-feitas" component={  } />
        <Route path="/receitas-favoritas" component={  } />
      </Switch>
    </BrowserRouter>

  // <div className="meals">
  //   <span className="logo">TRYBE</span>
  //   <object
  //     className="rocksGlass"
  //     type="image/svg+xml"
  //     data={ rockGlass }
  //   >
  //     Glass
  //   </object>
  // </div>
  );
}

export default App;
