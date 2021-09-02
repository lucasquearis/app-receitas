import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomFood } from '../services/randomsAPI';

function ExploreFoods() {
  const [foodRandom, setFoodRandom] = useState();

  useEffect(() => {
    fetchRandomFood()
      .then((response) => setFoodRandom(response.meals[0].idMeal));
  });

  return (
    <>
      <Header titulo="Explorar Comidas" showSearch={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${foodRandom}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
