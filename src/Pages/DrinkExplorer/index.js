import React from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function DrinkExplorer() {
  const history = useHistory();

  async function fetchRandomRecipe() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const request = await fetch(url);
    const data = await request.json();
    history.push(`/bebidas/${data.drinks[0].idDrink}`);
  }

  return (
    <div>
      <Header>Explorar Bebidas</Header>
      <main>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => fetchRandomRecipe() }
        >
          Me Surpreenda!
        </button>
      </main>
      <Footer />
    </div>
  );
}
