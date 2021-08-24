import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => (
  <BrowserRouter>
    <Switch>
      <SearchBar />
      <Route path="/comidas" />
      <Route path="/bebidas" />
      <Route path="/comidas/:id" />
      <Route path="/bebidas/:id" />
    </Switch>
  </BrowserRouter>
);

export default App;
