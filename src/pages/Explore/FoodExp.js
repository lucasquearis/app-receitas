import React from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';

export default function FoodExp() {
  return (
    <div>
      <Header name="Explorar Comidas" search={ false } />
      <MenuInferior />
    </div>
  );
}
