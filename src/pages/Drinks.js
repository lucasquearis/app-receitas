import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Drinks() {
  return (
    <div>
      <Header title="Bebidas" name="cocktail" search />
      <Recipes />
      <MenuInferior />
    </div>
  );
}
