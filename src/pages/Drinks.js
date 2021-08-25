import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';

export default function Drinks() {
  return (
    <div>
      <Header title="Bebidas" name="cocktail" search />
      <MenuInferior />
    </div>
  );
}
