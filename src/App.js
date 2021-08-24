import React from 'react';
import { Switch, Route } from 'react-router';
import { AppProvider } from './Context/ContextApp';
import Login from './Pages/Login/Login';
import Comidas from './Pages/Comidas/Comidas';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
      </Switch>
    </AppProvider>
  );
}

export default App;
