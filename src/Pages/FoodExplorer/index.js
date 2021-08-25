import React from 'react';
import { useHistory } from 'react-router';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function FoodExplorer() {
  const history = useHistory();

  async function fetchRandomRecipe() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const request = await fetch(url);
    const data = await request.json();
    history.push(`/comidas/${data.meals[0].idMeal}`);
  }

  return (
    <div>
      <Header>Explorar Comidas</Header>
      <main>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
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
