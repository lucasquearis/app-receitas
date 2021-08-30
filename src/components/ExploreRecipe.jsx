import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function ExploreRecipe() {
  const [location, setLocation] = useState({
    ingredient: false,
    explore: false,
  });

  const redirect = (path) => {
    setLocation({ ...location, [path]: true });
  };

  if (location.ingredient) return <Redirect to="/explorar/comidas/ingredientes" />;

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => redirect('ingredient') }
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
