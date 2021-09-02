import React from 'react';
import Header from '../../components/header';
import DoneRecipes from '../../components/DoneRecipes';

const ReceitasFav = () => (
  <>
    <Header
      title="Receitas Favoritas"
      hideSearch
      routeParams={ [undefined, undefined] }
    />
    <DoneRecipes />
  </>
);

export default ReceitasFav;
