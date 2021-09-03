import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodIngredients() {
  return (
    <div>
      <Header titulo="Explorar Ingredientes" showSearch={ false } />
      <Footer />
    </div>
  );
}

export default FoodIngredients;
