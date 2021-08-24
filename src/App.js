import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SearchBar from './components/SearchBar';
import AppProvider from './Context/AppProvider';

function App() {
  const id = 'olar';
  return (
    <BrowserRouter>
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ SearchBar } />
          <Route path="/bebidas" component={ SearchBar } />
          <Route path={ `/comidas/${id}` } component={ NotFound } />
          <Route path={ `/bebidas/${id}` } component={ NotFound } />
          <Route path={ `/comidas/${id}/in-progress` } component={ NotFound } />
          <Route path={ `/bebidas/${id}/in-progress` } component={ NotFound } />
          <Route path="/explorar" component={ NotFound } />
          <Route path="/explorar/comidas" component={ NotFound } />
          <Route path="/explorar/bebidas" component={ NotFound } />
          <Route path="/explorar/comidas/ingredientes" component={ NotFound } />
          <Route path="/explorar/bebidas/ingredientes" component={ NotFound } />
          <Route path="/explorar/comidas/area" component={ NotFound } />
          <Route path="/perfil" component={ NotFound } />
          <Route path="/receitas-feitas" component={ NotFound } />
          <Route path="/receitas-favoritas" component={ NotFound } />
        </Switch>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
