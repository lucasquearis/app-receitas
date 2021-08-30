import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as fetchAPI from '../service/fetchAPI';

function ExploreRecipe() {
  const [location, setLocation] = useState({
    ingredient: false,
    area: false,
    surprise: false,
  });

  const [randomId, setRandomId] = useState('');

  const redirect = (path) => {
    setLocation({ ...location, [path]: true });
  };

  const redirectToRandom = async () => {
    const { meals } = await fetchAPI.fetchRadomRecipe();
    await setRandomId(meals[0].idMeal);
    setLocation({ ...location, surprise: true });
  };

  if (location.ingredient) return <Redirect to="/explorar/comidas/ingredientes" />;
  if (location.area) return <Redirect to="/explorar/comidas/area" />;
  if (location.surprise) return <Redirect to={ `/comidas/${randomId}` } />;

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
        onClick={ () => redirect('area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => redirectToRandom() }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreRecipe;
