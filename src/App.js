// vitals
import React from 'react';
import Routes from './Routes';
// components
import Header from './components/Header';
// context
import RecipesProvider from './context/RecipesProvider';
// styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Header />
      <Routes />
    </RecipesProvider>
  );
}

export default App;
