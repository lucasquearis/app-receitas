import React from 'react';
import Header from '../../components/header';
import DoneRecipes from '../../components/DoneRecipes';

const ReceitasFeitas = () => (
  <>
    <Header
      title="Receitas Feitas"
      hideSearch
      routeParams={ [undefined, undefined] }
    />
    <DoneRecipes />
  </>
);

export default ReceitasFeitas;
