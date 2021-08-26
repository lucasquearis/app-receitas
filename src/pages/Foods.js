import React from 'react';
import MenuInferior from '../components/MenuInferior';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

export default function Foods() {
  return (
    <div>
      <Header title="Comidas" name="meal" search />
      <Recipes />
      <MenuInferior />
    </div>
  );
}
