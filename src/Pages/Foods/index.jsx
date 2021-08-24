import React from 'react';
import Header from '../../components/Header';
import RecipesContainer from '../../components/RecipesContainer';

import RecipesProvider from '../../Context/ContextRecipes';

function Foods() {
  return (
    <div>
      <Header title="Comidas" />
      <RecipesProvider>
        <RecipesContainer />
      </RecipesProvider>
    </div>
  );
}

export default Foods;
