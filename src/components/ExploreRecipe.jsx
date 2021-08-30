import React from 'react';

function ExploreRecipe() {
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreRecipe;
