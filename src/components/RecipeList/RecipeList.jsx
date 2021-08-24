import React from 'react';
import UseRecipes from '../../hook/UseRecipes';

const RecipeList = () => {
  const { chooser } = UseRecipes();
  return (
    <section>
      <h2>Receitas</h2>
      {chooser()}
    </section>
  );
};

export default RecipeList;
