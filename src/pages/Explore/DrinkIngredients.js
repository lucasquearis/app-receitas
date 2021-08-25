import React from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';

export default function DrinkIngredients() {
  return (
    <div>
      <Header name="Explorar Ingredientes" search={ false } />
      <MenuInferior />
    </div>
  );
}
