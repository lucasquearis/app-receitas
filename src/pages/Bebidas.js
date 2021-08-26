import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';

export default function Bebidas() {
  const { setRecipeType } = useContext(Context);
  setRecipeType('cocktail');
  return (
    <div>
      <Header recipeType="drinks">
        Bebidas
      </Header>
      <MenuInferior />
    </div>
  );
}
