import React from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';

export default function DrinkExp() {
  return (
    <div>
      <Header name="Explorar Bebidas" search={ false } />
      <MenuInferior />
    </div>
  );
}
