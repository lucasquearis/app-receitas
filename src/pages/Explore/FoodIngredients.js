import React from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';

export default function FoodIngredients() {
  return (
    <div>
      <Header
        name="Explorar Ingredientes"
        title="Explorar Ingredientes"
        search={ false }
      />
      <MenuInferior />
    </div>
  );
}
