import React from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import ExploreButtons from '../../components/ExploreButtons';

export default function DrinkExp() {
  return (
    <div>
      <Header name="Explorar Bebidas" search={ false } />
      <ExploreButtons type="drinks" />
      <MenuInferior />
    </div>
  );
}
