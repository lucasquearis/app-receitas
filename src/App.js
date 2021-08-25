// vitals
import React from 'react';
import Routes from './Routes';
// components
// context
import RecipesProvider from './context/RecipesProvider';
// styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecipesProvider>
      <Routes />
    </RecipesProvider>
  );
}

export default App;
