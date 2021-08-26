import React, { useContext } from 'react';
import Context from '../context/Context';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';

export default function Comidas() {
  const { setRecipeType } = useContext(Context);
  setRecipeType('meals');
  return (
    <div>
      <Header>
        Comidas
      </Header>
      <MenuInferior />
    </div>
  );
}
