// vitals
import React from 'react';
import Routes from './Routes';
// context
import RecipesProvider from './context/RecipesProvider';
// styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

function App() {
  return (
    <RecipesProvider>
      <Header />
      <Routes />
    </RecipesProvider>
  );
}

export default App;
