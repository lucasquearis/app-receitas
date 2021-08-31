import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function ExploreDrinks() {
  const history = useHistory();

  const SurpriseMe = async () => {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const { drinks: [{ idDrink }] } = await fetch(endPoint)
      .then((response) => response.json());
    history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div>
      <h1>Explorar Bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => SurpriseMe() }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreDrinks;
