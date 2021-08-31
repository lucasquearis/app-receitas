import React from 'react';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';
import ExploreButtons from '../../components/ExploreButtons';

export default function FoodExp() {
  return (
    <div>
      <Header name="Explorar Comidas" title="Explorar Comidas" search={ false } />
      <ExploreButtons type="foods" />
      <MenuInferior />
    </div>
  );
}
