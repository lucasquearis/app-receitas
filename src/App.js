import React from 'react';
import { Route, Switch } from 'react-router';
import { AppProvider } from './Context/ContextApp';
import Header from './components/Header/index';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" render={ () => <Header title="Comida" /> } />
      </Switch>
    </AppProvider>
  );
}

export default App;
