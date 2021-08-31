import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRandomFood } from '../../services/fetchApi';

export default function ExploreFoods() {
  const [state, setState] = useState({
    redirect: false,
    id: '',
  });

  const getRandomFood = async () => {
    const foodData = await fetchRandomFood();
    const foodId = foodData[0].idMeal;
    setState({
      redirect: true,
      id: foodId,
    });
  };

  if (state.redirect) return <Redirect to={ `/comidas/${state.id}` } />;
  return (
    <section>
      <Header title="Explorar Comidas" />
      <h1>Explorar Comidas</h1>
      <Link to="/explorar/comidas/ingredientes">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          data-testid="explore-by-area"
          type="button"
        >
          Por Local de Origem
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ getRandomFood }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </section>
  );
}
