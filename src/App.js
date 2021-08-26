import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import FoodAndDrinksProvider from './context/FoodAndDrinksProvider';
import CategoriesProvider from './context/CategoriesProvider';

function App() {
  return (
    <FoodAndDrinksProvider>
      <CategoriesProvider>
        <Routes />
      </CategoriesProvider>
    </FoodAndDrinksProvider>
  );
}

export default App;
