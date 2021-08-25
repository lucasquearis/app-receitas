import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import FoodAndDrinksProvider from './context/FoodAndDrinksProvider';

function App() {
  return (
    <FoodAndDrinksProvider>
      <Routes />
    </FoodAndDrinksProvider>
  );
}

export default App;
