import React from 'react';
import DoneRecipe from '../../components/DoneRecipe/DoneRecipe';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const RecipesMade = () => (
  <div>
    <HeaderWithoutSearch>Receitas Feitas</HeaderWithoutSearch>
    <DoneRecipe />
  </div>
);

export default RecipesMade;
