import React from 'react';
import { Switch, Route } from 'react-router';
import { AppProvider } from './Context/ContextApp';
import Login from './Pages/Login/Login';
import Comidas from './Pages/Comidas/Comidas';
import Profile from './Pages/Profile/Profile';
import ReceitasFavoritas from './Pages/ReceitasFavoritas/ReceitasFavoritas';
import ReceitasFeitas from './Pages/ReceitasFeitas/ReceitasFeitas';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </AppProvider>
  );
}

export default App;
