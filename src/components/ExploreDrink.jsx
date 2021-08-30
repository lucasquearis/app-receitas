import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as fetchAPI from '../service/fetchAPI';

function ExploreDrink() {
  const [location, setLocation] = useState({
    ingredient: false,
    explore: false,
  });

  const [randomId, setRandomId] = useState('');

  const redirect = (path) => {
    setLocation({ ...location, [path]: true });
  };

  const redirectToRandom = async () => {
    const { drinks } = await fetchAPI.fetchRadomDrink();
    await setRandomId(drinks[0].idDrink);
    setLocation({ ...location, surprise: true });
  };

  if (location.ingredient) return <Redirect to="/explorar/bebidas/ingredientes" />;
  if (location.surprise) return <Redirect to={ `/bebidas/${randomId}` } />;

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
        data-testid="explore-surprise"
        onClick={ () => redirectToRandom() }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreDrink;
